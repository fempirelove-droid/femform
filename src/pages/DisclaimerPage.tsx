import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';

type Props = { navigate: NavigateFn };

export function DisclaimerPage({ navigate: _navigate }: Props) {
  useSEO({
    title: 'Medical Disclaimer · Fempire.Love',
    description: 'Fempire.Love provides educational content, not medical advice. Always consult a qualified healthcare provider.',
    canonical: '/disclaimer',
  });

  return (
    <main className="max-w-[720px] mx-auto px-[22px] pt-[50px] pb-20">
      <h1 className="font-display font-bold text-[clamp(30px,5vw,44px)] tracking-tight mb-3">
        Medical Disclaimer
      </h1>
      <p className="text-soft-2 text-sm mb-10">Last updated: September 2026</p>

      <div className="text-soft text-[15.5px] leading-[1.85] article-body">
        <div
          className="p-5 rounded-xl mb-8"
          style={{ background: 'rgba(198,138,46,0.12)', border: '1px solid rgba(198,138,46,0.3)' }}
        >
          <p className="m-0 text-[15px]">
            <strong>The information on Fempire.Love is for educational purposes only.</strong> It is
            not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        <h2>What our content is</h2>
        <p>
          Our articles are written to help you understand your body, your hormones, and your health.
          They are based on current research and, where indicated, reviewed by qualified medical
          professionals. But they are educational content, not personalized medical advice.
        </p>

        <h2>What our content is not</h2>
        <ul>
          <li>It is not a diagnosis.</li>
          <li>It is not a treatment plan.</li>
          <li>It is not a replacement for seeing a doctor, midwife, or other healthcare provider.</li>
          <li>It is not tailored to your individual medical history or circumstances.</li>
        </ul>

        <h2>When to see a doctor</h2>
        <p>
          Always consult a qualified healthcare provider if you have concerns about your health. Do
          not delay seeking medical advice because of something you read on this site. If you
          experience severe symptoms, including but not limited to severe pain, heavy bleeding,
          thoughts of self-harm, or symptoms that are getting worse, contact a healthcare provider
          or emergency services immediately.
        </p>

        <h2>Our commitment</h2>
        <p>
          We strive to keep our content accurate and up to date. Articles that cover medical topics
          are marked with a medical review note when they have been reviewed by a qualified
          professional. However, medical knowledge evolves, and we cannot guarantee that every
          article reflects the most recent research.
        </p>

        <h2>Your responsibility</h2>
        <p>
          By using Fempire.Love, you acknowledge that you are responsible for your own health
          decisions and that you will consult a healthcare provider before making changes to your
          treatment, medication, or lifestyle based on information you find here.
        </p>
      </div>
    </main>
  );
}
