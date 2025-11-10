import LogoLoop from '../ui/logo-loop.jsx';

import { SiAmazon, SiGoogle, SiMeta, SiApple, SiNvidia, SiAdobe, SiCisco, SiNetflix, SiStripe } from 'react-icons/si';
import { SiAtlassian, SiOracle, SiGithub, SiAirbnb, SiSpotify, SiSalesforce } from 'react-icons/si';
import { FaMicrosoft } from "react-icons/fa";

const techLogos = [
  { node: <SiAmazon />, title: "Amazon", href: "https://www.amazon.com" },
  { node: <SiGoogle />, title: "Google", href: "https://about.google/" },
  { node: <SiMeta />, title: "Meta", href: "https://www.meta.com/" },
  { node: <FaMicrosoft />, title: "Microsoft", href: "https://www.microsoft.com" },
  { node: <SiApple />, title: "Apple", href: "https://www.apple.com" },
  { node: <SiNvidia />, title: "NVIDIA", href: "https://www.nvidia.com" },
  { node: <SiAdobe />, title: "Adobe", href: "https://www.adobe.com" },
  { node: <SiCisco />, title: "Cisco", href: "https://www.cisco.com" },
  { node: <SiNetflix />, title: "Netflix", href: "https://www.netflix.com" },
  { node: <SiStripe />, title: "Stripe", href: "https://stripe.com" },
  { node: <SiAtlassian />, title: "Atlassian", href: "https://www.atlassian.com" },
  { node: <SiOracle />, title: "Oracle", href: "https://www.oracle.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiAirbnb />, title: "Airbnb", href: "https://www.airbnb.com" },
  { node: <SiSpotify />, title: "Spotify", href: "https://www.spotify.com" },
  { node: <SiSalesforce />, title: "Salesforce", href: "https://www.salesforce.com" },
];

// Alternative with image sources
const imageLogos = [
    { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
    { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
    { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];

function TechLogos() {
    return (
        <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
            {/* Basic horizontal loop */}
            <LogoLoop
                logos={techLogos}
                speed={120}
                direction="left"
                logoHeight={48}
                gap={40}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#131827"
                ariaLabel="Technology partners"
            />


        </div>
    );
}

export default TechLogos;