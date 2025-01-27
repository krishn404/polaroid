import { Metadata } from 'next'
import PolaroidStack from "../components/layout/polaroid-stack";

export const metadata: Metadata = {
  title: "Convert your memories to polaroid",
  description: "Want to Generate polaroids? Transform your digital photos into vintage-style Polaroid pictures with custom handwritten captions.",
  openGraph: {
    title: "Convert your memories to polaroid",
    description: "Want to Generate polaroids? Transform your digital photos into vintage-style Polaroid pictures.",
  }
};

export default function Home() {
  return (
    <div>
      <PolaroidStack/>
    </div>
  );
}