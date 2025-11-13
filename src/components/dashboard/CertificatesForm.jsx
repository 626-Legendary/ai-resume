import React, { useState, useEffect, useCallback, memo } from "react";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react"; 

// 证书表单的字段配置
const CERTIFICATE_FIELDS = [
    { key: "name", label: "Certificate Name", placeholder: "AWS Certified Developer", type: "text", col: 2 },
    { key: "issuingOrg", label: "Issuing Organization", placeholder: "Amazon Web Services (AWS)", type: "text", col: 2 },
    { key: "issueDate", label: "Issue Date", placeholder: "MM/YYYY", type: "text", col: 1 },
    { key: "expirationDate", label: "Expiration Date", placeholder: "MM/YYYY (or empty if none)", type: "text", col: 1 },
    { key: "credentialID", label: "Credential ID", placeholder: "ABC-12345", type: "text", col: 2 },
    { key: "credentialURL", label: "Credential URL", placeholder: "https://cert.example.com/...", type: "url", col: 2 },
];

// 默认的空证书对象
const DEFAULT_CERTIFICATE = CERTIFICATE_FIELDS.reduce((acc, field) => {
    acc[field.key] = '';
    return acc;
}, {});

const CertificatesForm = ({ data, setData, initialData, setLocalData, onNext, onPrevious, isFirstStep, isLastStep }) => {
    // 兼容两种父组件接口：data/setData 或 initialData/setLocalData
    const effectiveInitial = initialData ?? data ?? [DEFAULT_CERTIFICATE];
    const effectiveSet = setLocalData ?? setData ?? (() => {});

    // 本地状态，防止父组件频繁更新导致失焦
    const [certificates, setCertificates] = useState(Array.isArray(effectiveInitial) && effectiveInitial.length > 0 ? effectiveInitial : [DEFAULT_CERTIFICATE]);

    useEffect(() => {
        setCertificates(Array.isArray(effectiveInitial) && effectiveInitial.length > 0 ? effectiveInitial : [DEFAULT_CERTIFICATE]);
    }, [effectiveInitial]);

    // 更新特定证书项的特定字段（稳定回调）
    const updateCertificateField = useCallback((index, key, value) => {
        setCertificates(prev => {
            const newCertificates = [...prev];
            newCertificates[index] = { ...newCertificates[index], [key]: value };
            return newCertificates;
        });
    }, []);

    const addCertificate = useCallback(() => {
        setCertificates(prev => [...prev, DEFAULT_CERTIFICATE]);
    }, []);

    const removeCertificate = useCallback((index) => {
        setCertificates(prev => {
            if (prev.length > 1) {
                return prev.filter((_, i) => i !== index);
            }
            return [DEFAULT_CERTIFICATE];
        });
    }, []);

    // 在本地 certificates 变化后将其同步到父组件（在渲染后执行）
    useEffect(() => {
        if (typeof effectiveSet === 'function') {
            effectiveSet(certificates);
        }
    }, [certificates, effectiveSet]);

    return (
        <div className="w-full max-w-md pt-6 mx-auto">
            <FieldSet>
                <FieldLegend>Certifications</FieldLegend>
                <FieldDescription>
                    List any relevant certifications, licenses, or awards you have obtained.
                </FieldDescription>

                {certificates.map((certificate, index) => (
                    <FieldGroup key={index} className="flex flex-col gap-4 mt-6 p-4 border rounded-lg">
                        
                        {/* 标题和删除按钮 */}
                        <div className="flex justify-between items-center pb-2 border-b">
                            <h3 className="text-lg font-semibold text-foreground">
                                Certificate {index + 1}: {certificate.name || "New Certificate"}
                            </h3>
                            {certificates.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCertificate(index)}
                                    className="text-red-500 hover:bg-red-500/10"
                                >
                                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                                </Button>
                            )}
                        </div>

                        {/* 证书字段 */}
                        <div className="grid grid-cols-2 gap-4">
                            {CERTIFICATE_FIELDS.map(field => (
                                <Field key={field.key} className={field.col === 2 ? "col-span-2" : ""}>
                                    <FieldLabel htmlFor={`${field.key}-${index}`}>{field.label}</FieldLabel>
                                    
                                    <Input
                                        id={`${field.key}-${index}`}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={certificate[field.key] || ""}
                                        onChange={e => updateCertificateField(index, field.key, e.target.value)}
                                    />
                                </Field>
                            ))}
                        </div>
                    </FieldGroup>
                ))}
                
                {/* 增加按钮 */}
                <Button
                    type="button"
                    onClick={addCertificate}
                    variant="outline"
                    className="w-full mt-4 flex items-center justify-center text-primary border-primary/50 hover:bg-primary/5"
                >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Another Certificate
                </Button>

            </FieldSet>
            
            {/* 导航按钮区域 */}
            <div className="my-6 flex justify-between">
                <Button 
                    onClick={onPrevious} 
                    variant="outline" 
                    disabled={isFirstStep}
                    className="flex items-center gap-1"
                >
                    &lt;&lt; Previous
                </Button>
                <Button 
                    onClick={onNext}
                    className="flex items-center gap-1"
                >
                    {isLastStep ? "Finish & Save" : "Next >>"}
                </Button>
            </div>
        </div>
    );
};

export default memo(CertificatesForm);