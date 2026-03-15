import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Mail, ArrowRight } from 'lucide-react'
import { LIMAC } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join the Limac Power Tech team in Thrissur, Kerala. We\'re hiring battery technicians, sales professionals, and solar engineers. Build the future of energy in Kerala.',
  openGraph: {
    title: 'Careers at Limac Power Tech | Thrissur, Kerala',
    description: 'Join our growing team of battery and solar energy professionals in Thrissur, Kerala.',
    images: [{ url: '/og-image.jpg' }],
    siteName: 'Limac Power Tech',
  },
}

const OPENINGS = [
  {
    title: 'Battery Sales Executive',
    type: 'Full-time',
    location: 'Thrissur, Kerala',
    description:
      'Handle B2C and B2B sales of LiFePO4 batteries. Visit solar installers, build relationships with contractors, and support walk-in customers. Experience in sales or electrical products preferred.',
    requirements: [
      'Minimum 1 year sales experience (electrical/solar products preferred)',
      'Good communication in Malayalam and English',
      'Two-wheeler and driving licence required',
      'Basic understanding of battery technology a plus',
    ],
  },
  {
    title: 'Battery Technician',
    type: 'Full-time',
    location: 'Thrissur, Kerala',
    description:
      'Assemble, test, and repair LiFePO4 battery packs. Configure BMS systems, perform diagnostic tests, and support installation teams. ITI or diploma in electrical engineering preferred.',
    requirements: [
      'ITI / Diploma in Electrical or Electronics',
      'Experience with battery systems or solar installations',
      'Ability to read wiring diagrams and technical manuals',
      'Physically fit for field installation work',
    ],
  },
  {
    title: 'Solar & Battery Installation Supervisor',
    type: 'Full-time',
    location: 'Thrissur & District Areas, Kerala',
    description:
      'Lead on-site battery and solar installation teams. Ensure quality, safety, and customer satisfaction at installation sites across Thrissur district and beyond.',
    requirements: [
      'Minimum 2 years in solar/battery installation',
      'Understanding of LiFePO4 and solar inverter systems',
      'Leadership and team management skills',
      'Valid vehicle licence — field travel required',
    ],
  },
]

export default function CareersPage() {
  return (
    <div className="bg-limac-black pt-24">
      {/* Header */}
      <section className="py-12 px-4 border-b border-gray-800 bg-limac-navy">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block bg-limac-green/10 border border-limac-green/30 text-limac-green text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Careers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Join the <span className="gradient-text">Limac Team</span>
          </h1>
          <p className="text-limac-muted text-lg max-w-2xl">
            Power the future of clean energy in Kerala. We&apos;re a growing team passionate
            about LiFePO4 technology and making it accessible to every home and business.
          </p>
        </div>
      </section>

      {/* Why work with us */}
      <section className="py-16 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Why Work at Limac?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: '🌱', title: 'Green Industry', desc: 'Work on technology that reduces carbon emissions and powers clean energy.' },
              { emoji: '📈', title: 'Growing Company', desc: 'Join us at an exciting growth phase — your contributions make a real impact.' },
              { emoji: '🧠', title: 'Learn & Grow', desc: 'Hands-on training in cutting-edge LiFePO4 battery technology.' },
              { emoji: '🤝', title: 'Great Culture', desc: 'A friendly, supportive team that values your ideas and hard work.' },
            ].map((item) => (
              <div key={item.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-limac-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Current Openings</h2>
          <div className="space-y-5">
            {OPENINGS.map((job) => (
              <div key={job.title} className="bg-gray-900 border border-gray-800 hover:border-limac-green/40 rounded-xl p-6 card-hover">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">{job.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-limac-muted">
                      <span className="bg-limac-green/10 text-limac-green border border-limac-green/20 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:${LIMAC.email.info}?subject=Application: ${job.title}&body=Hi, I am applying for the ${job.title} position at Limac Power Tech.`}
                    className="inline-flex items-center gap-2 bg-limac-green hover:bg-green-400 text-limac-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
                  >
                    Apply Now <ArrowRight size={14} />
                  </a>
                </div>
                <p className="text-limac-muted text-sm leading-relaxed mb-4">{job.description}</p>
                <div>
                  <div className="text-white text-xs font-semibold mb-2 uppercase tracking-wider">Requirements</div>
                  <ul className="space-y-1.5">
                    {job.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-limac-muted text-sm">
                        <span className="text-limac-green mt-0.5">→</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* General application */}
          <div className="mt-10 bg-limac-navy border border-gray-800 rounded-xl p-8 text-center">
            <h3 className="text-white font-bold text-xl mb-2">Don&apos;t see a fit?</h3>
            <p className="text-limac-muted text-sm mb-5">
              We&apos;re always looking for talented, passionate people. Send us your CV and we&apos;ll
              keep it on file for future opportunities.
            </p>
            <a
              href={`mailto:${LIMAC.email.info}?subject=General Job Application — Limac Power Tech`}
              className="inline-flex items-center gap-2 border border-limac-green/40 text-limac-green hover:bg-limac-green/10 font-semibold px-6 py-3 rounded-lg transition-all"
            >
              <Mail size={16} />
              Send Your CV
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
