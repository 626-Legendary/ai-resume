import React, { useState, useEffect, useMemo } from 'react';

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
// 导入更多的图标以供使用
import { 
    Loader2, CheckCircle, ArrowRight, Brain, Zap, HardHat, Database, Server, 
    FileText, User, Settings, Send, Globe, Key, AlertTriangle, Code, Download, Cpu 
} from 'lucide-react';

const TOTAL_DURATION_AVERAGE = 30000; // 预计总时长（毫秒），调整为更真实的生成时间 (30秒)
const INTERVAL_MS = 500; // 进度条更新频率 (毫秒)

const RAW_STAGES = [
    { id: 1, label: "Initializing the User Interface and components...", minDuration: 5, maxDuration: 10, icon: Settings }, // 前端
    { id: 2, label: "Collecting core user inputs (Info & Job Target)...", minDuration: 5, maxDuration: 10, icon: User }, // 前端
    { id: 3, label: "Validating user input fields locally...", minDuration: 5, maxDuration: 10, icon: CheckCircle }, // 前端
    { id: 4, label: "Registering the user's selected template and style...", minDuration: 5, maxDuration: 10, icon: FileText }, // 前端
    { id: 5, label: "Transmitting the data payload to the backend service...", minDuration: 5, maxDuration: 10, icon: Send }, // 前端
    
    { id: 6, label: "Receiving the request at the API Gateway...", minDuration: 5, maxDuration: 10, icon: ArrowRight }, // 后端
    { id: 7, label: "Sanitizing and cleansing raw input data...", minDuration: 5, maxDuration: 10, icon: Database }, // 后端
    { id: 8, label: "Extracting key entities and tags (Keywords/Skills)...", minDuration: 5, maxDuration: 10, icon: Zap }, // 后端
    { id: 9, label: "Applying pre-processing rules (e.g., language optimization)...", minDuration: 5, maxDuration: 10, icon: Code }, // 后端
    { id: 10, label: "Dynamically constructing the LLM Prompt based on criteria...", minDuration: 5, maxDuration: 10, icon: Brain }, // 后端
    
    { id: 11, label: "Invoking the LLM API with proper authentication...", minDuration: 25, maxDuration: 35, icon: Key }, // 后端 -> LLM
    { id: 12, label: "Receiving the prompt and initiating LLM inference...", minDuration: 25, maxDuration: 35, icon: Cpu }, // LLM 服务
    { id: 13, label: "Generating structured resume content (JSON/Markdown) via LLM...", minDuration: 15, maxDuration: 20, icon: Globe }, // LLM 服务 (耗时最久)
    { id: 14, label: "Retrieving the raw output from the LLM service...", minDuration: 15, maxDuration: 25, icon: Server }, // 后端
    { id: 15, label: "Parsing the LLM output and validating its structure...", minDuration: 25, maxDuration: 35, icon: Database }, // 后端
    
    { id: 16, label: "Checking content for safety and compliance (Moderation)...", minDuration: 5, maxDuration: 10, icon: AlertTriangle }, // 后端
    { id: 17, label: "Populating the selected resume template with content...", minDuration: 15, maxDuration: 20, icon: FileText }, // 后端
    { id: 18, label: "Rendering the final deliverable file (e.g., PDF/HTML)...", minDuration: 15, maxDuration: 20, icon: HardHat }, // 后端
    { id: 19, label: "Storing the generation result and sending the response...", minDuration: 25, maxDuration: 35, icon: Loader2 }, // 后端
    { id: 20, label: "Receiving the response and rendering the final document for download...", minDuration: 10, maxDuration: 15, icon: Download }, // 前端
];




const useStageProgressRanges = () => {
  const stageRanges = useMemo(() => {

    const stagesWithDuration = RAW_STAGES.map(stage => {

      const duration = stage.minDuration + Math.random() * (stage.maxDuration - stage.minDuration);
      return { ...stage, duration };
    });

    const actualTotalDuration = stagesWithDuration.reduce((sum, stage) => sum + stage.duration, 0);

    let accumulatedTime = 0;
    const ranges = stagesWithDuration.map(stage => {
      const start = (accumulatedTime / actualTotalDuration) * 100;
      accumulatedTime += stage.duration;
      const end = (accumulatedTime / actualTotalDuration) * 100;
      return { ...stage, start, end };
    });

    return { ranges, actualTotalDuration };
  }, []); 

  return stageRanges;
};


const AILongProcessSimulator = ({ initialStart, externalAbort, onFinish, onAbort }) => {
  const { ranges: stageRanges, actualTotalDuration } = useStageProgressRanges();

  const [isProcessing, setIsProcessing] = useState(initialStart || false);
  const [progress, setProgress] = useState(0); 
  const [isDone, setIsDone] = useState(false);
  const [isAborted, setIsAborted] = useState(false); // 用于标记是否由 externalAbort 提前完成

  // 计算达到目标时间所需的平均每间隔增量
  const avgProgressPerInterval = useMemo(() => {
    // 总毫秒数 / 间隔毫秒数 = 总间隔数
    const totalIntervals = (actualTotalDuration * 1000) / INTERVAL_MS;
    // 100% / 总间隔数 = 平均每次应增加的进度
    return 100 / totalIntervals;
  }, [actualTotalDuration]);

  // 1. 根据 progress 状态，实时计算当前阶段
  const currentStage = useMemo(() => {
      if (isDone || !isProcessing) return stageRanges[0];
      
      // 找到进度落在哪一个阶段
      const stage = stageRanges.find(s => progress >= s.start && progress < s.end);
      return stage || stageRanges[stageRanges.length - 1];
  }, [progress, isDone, isProcessing, stageRanges]);


  // 2. 监听外部中断 (后端数据已返回)
  useEffect(() => {
      // 当 externalAbort 为 true 且流程仍在进行时，触发中断
      if (externalAbort && !isDone) {
          setIsProcessing(false);
          setIsDone(true);
          setIsAborted(true); 
          setProgress(100); 
          if (onFinish) onFinish();
      }
  }, [externalAbort, isDone, onFinish]);


  // 3. 计时器和**随机增量**进度更新逻辑
  useEffect(() => {
      let timer;
      if (isProcessing && !isDone) {
          timer = setInterval(() => {
              setProgress(prevProgress => {
                  const stageForCalculation = stageRanges.find(s => prevProgress >= s.start && prevProgress < s.end);
                  if (!stageForCalculation) return 100; 
                  
                  // --- 调整随机增量逻辑以匹配目标时长 ---
                  
                  // 1. 基础波动因子: 确保进度不会完全停止
                  // 范围: [0.1, 1.9]，平均值约 1.0，让进度平均速度接近 avgProgressPerInterval
                  let volatilityFactor = 0.1 + Math.random() * 1.8; 

                  // 2. 偶尔给一个更大的尖峰 (20% 几率)
                  if (Math.random() < 0.2) {
                      volatilityFactor += Math.random() * 1.5; // 额外增加最多 1.5x
                  }
                  
                  // 计算实际进度跳跃值
                  let baseJump = avgProgressPerInterval * volatilityFactor; 
                  
                  // 3. 确保进度不会跳过当前阶段的结束点
                  let newProgress = prevProgress + baseJump;
                  
                  // 进度钳制：不能超过当前阶段的结束百分比
                  if (newProgress > stageForCalculation.end) {
                      newProgress = stageForCalculation.end;
                  }

                  // 最终钳制到 100%
                  if (newProgress >= 100) {

                      return 100;
                  }
                  
                  return newProgress;
              });
          }, INTERVAL_MS);
      } 
      
      return () => clearInterval(timer);
  }, [isProcessing, isDone, stageRanges, avgProgressPerInterval]); 


  useEffect(() => {
      if (progress === 100 && isProcessing) {
          setIsProcessing(false);
          setIsDone(true);

          if (onFinish) onFinish(); 
      }
  }, [progress, isProcessing, onFinish]);



  const getStageIcon = (stage) => {
    const IconComponent = stage.icon;
    const color = stage.id === 1 ? 'text-blue-600' : 
                  stage.id <= 3 ? 'text-blue-500' : 
                  stage.id <= 5 ? 'text-orange-500' : 
                  'text-purple-500';
                  

    return <IconComponent className={`h-4 w-4 ${color} animate-spin`} />;
  };
  
  if (!isProcessing && !isDone) return null;


  const accumulatedTimeForCurrentStage = (currentStage.start / 100) * actualTotalDuration;

  return (
    <Card className="w-full border-none shadow-none"> 
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-xl">Processing...</CardTitle>
        <CardDescription>
            Current estimate: {actualTotalDuration.toFixed(1)}s
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 space-y-6">


        <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">

              <span>Overall progress ({accumulatedTimeForCurrentStage.toFixed(1)}s elapsed in current stage)</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
        </div>


        {!isDone && (
          <div className="p-4 border rounded-lg bg-secondary/30 transition-all duration-300">
            <div className="flex items-center space-x-3">

              {getStageIcon(currentStage)}

              <p className="font-medium text-sm">
                {currentStage.label}
              </p>
            </div>

            <p className="text-xs text-muted-foreground mt-2 pl-7">
                Current Stage Estimate: {currentStage.duration.toFixed(1)}s
            </p>
          </div>
        )}


        {isDone && (
              <div className={`flex items-center p-4 border rounded-lg ${isAborted ? 'bg-orange-500/10 text-orange-700' : 'bg-green-500/10 text-green-700'}`}>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <p className="font-semibold">
                      {isAborted 
                          ? 'AI Model Processing Complete! (Backend data returned early, fast execution)'
                          : 'AI Model Processing Complete! (Simulation completed using maximum duration))'
                      }
                  </p>
              </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AILongProcessSimulator;