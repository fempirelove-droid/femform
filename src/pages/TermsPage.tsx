import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';

type Props = { navigate: NavigateFn };

export function TermsPage({ navigate: _navigate }: Props) {
  useSEO({
    title: 'Terms & Conditions — Fempire.Love',
    description: 'The terms and conditions for using Fempire.Love and its membership services.',
    canonical: '/terms',
  });

  return (
    <main className="max-w-[720px] mx-auto px-[22px] pt-[50px] pb-20">
      <h1 className="font-display font-bold text-[clamp(30px,5vw,44px)] tracking-tight mb-3">
        Terms &amp; Conditions
      </h1>
      <p className="text-soft-2 text-sm mb-10">Last updated: September 2026</p>

      <div className="text-soft text-[15.5px] leading-[1.85] article-body">
        <p>
          By using Fempire.Love, you agree to these terms. Please read them carefully.
        </p>

        <h2>Membership</h2>
        <p>
          Fempire.Love offers three membership tiers: Free, Community ($10/month), and Premium
          ($33/month). Paid memberships are billed monthly through Stripe and can be cancelled at
          any time. Cancellation takes effect at the end of your current billing period.
        </p>

        <h2>Content access</h2>
        <p>
          Free articles are available to everyone. Members-only content is accessible only to active
          paying members. Sharing your account credentials with others is not permitted.
        </p>

        <h2>Acceptable use</h2>
        <ul>
          <li>You may not copy, redistribute, or republish our content without permission.</li>
          <li>You may not use the site to harass, abuse, or discriminate against others.</li>
          <li>You may not attempt to bypass paywalls or access controls.</li>
        </ul>

        <h2>Webinars and coaching</h2>
        <p>
          Live webinars may be purchased as one-time purchases ($20-$35). Premium members receive
          quarterly 1:1 coaching sessions, booked through a scheduling link. Coaching sessions must
          be used within the billing period in which they are allocated.
        </p>

        <h2>Refunds</h2>
        <p>
          Due to the digital nature of our content, membership fees are non-refundable. You may
          cancel at any time to prevent future charges. Single-purchase webinars are refundable up
          to 48 hours before the scheduled event.
        </p>

        <h2>Changes to terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after changes are
          posted constitutes acceptance of the new terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email us at{' '}
          <a href="mailto:hello@fempire.love" className="text-bougain no-underline hover:text-cream">
            hello@fempire.love
          </a>
          .
        </p>
      </div>
    </main>
  );
}
