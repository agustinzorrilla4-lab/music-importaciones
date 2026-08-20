import InfoPage from "@/components/InfoPage";
import Accordion from "@/components/Accordion";
import { fullFaq } from "@/data/faq";

export default function FAQ() {
  return (
    <InfoPage eyebrow="Ayuda" title="Preguntas frecuentes">
      <Accordion
        items={fullFaq.map((item) => ({ title: item.question, content: item.answer }))}
      />
    </InfoPage>
  );
}
