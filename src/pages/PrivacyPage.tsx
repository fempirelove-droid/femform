import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';

type Props = { navigate: NavigateFn };

export function PrivacyPage({ navigate: _navigate }: Props) {
  useSEO({
    title: 'Privacy Policy · Fempire.Love',
    description: 'How Fempire.Love collects, uses, and protects your personal data in line with GDPR.',
    canonical: '/privacy',
  });

  return (
    <main className="max-w-[720px] mx-auto px-[22px] pt-[50px] pb-20">
      <h1 className="font-display font-bold text-[clamp(30px,5vw,44px)] tracking-tight mb-3">
        Privacy Policy
      </h1>
      <p className="text-soft-2 text-sm mb-10">Last updated: September 2026</p>

      <div className="text-soft text-[15.5px] leading-[1.85] article-body">
        <p>
          Fempire.Love ("we", "us", "our") respects your privacy. This policy explains how we collect,
          use, and protect your personal data, in compliance with the General Data Protection
          Regulation (AVG/GDPR) applicable to visitors from the Netherlands and the European Union.
        </p>

        <h2>What data we collect</h2>
        <ul>
          <li><strong>Email address</strong>: when you subscribe to our newsletter.</li>
          <li><strong>Account information</strong>: name and email when you create an account.</li>
          <li><strong>Payment information</strong>: handled entirely by Stripe. We never see or store your card details.</li>
          <li><strong>Usage data</strong>: anonymous analytics about which pages are visited, to improve our content.</li>
          <li><strong>Location data</strong>: your country or region, when you tell us where you are joining from.</li>
        </ul>

        <h2>How we use your data</h2>
        <ul>
          <li>To send you our newsletter and email updates (only with your consent).</li>
          <li>To manage your membership and access to content.</li>
          <li>To improve our content and understand what resonates with our community.</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2>Your rights under GDPR</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Withdraw consent for processing at any time.</li>
          <li>Receive a copy of your data in a portable format.</li>
          <li>Lodge a complaint with your local data protection authority.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use minimal cookies: essential cookies for the site to function, and analytics cookies
          (only with your consent) to understand traffic patterns. You can withdraw cookie consent
          at any time.
        </p>

        <h2>Data retention</h2>
        <p>
          We retain your data only as long as necessary for the purposes described above. When you
          cancel your membership, we retain your account data for 30 days in case you wish to return,
          after which it is deleted.
        </p>

        <h2>Contact</h2>
        <p>
          For any privacy questions or requests, contact us at{' '}
          <a href="mailto:hello@fempire.love" className="text-bougain no-underline hover:text-cream">
            hello@fempire.love
          </a>
          .
        </p>
      </div>
    </main>
  );
}
