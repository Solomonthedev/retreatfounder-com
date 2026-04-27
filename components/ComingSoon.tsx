import { EmailCaptureForm } from './EmailCaptureForm'

interface Props {
  categoryName: string
  formId: string
  description?: string
}

export function ComingSoon({ categoryName, formId, description }: Props) {
  return (
    <div className="max-w-md mx-auto py-20 px-4 text-center">
      <span className="font-mono text-xs text-ochre uppercase tracking-widest">Coming Soon</span>
      <h1 className="font-heading text-3xl text-ink mt-3 mb-4">{categoryName}</h1>
      <p className="text-ink/60 text-sm mb-8">
        {description ?? `We're curating the best resources for this category. Be the first to know when it's live.`}
      </p>
      <EmailCaptureForm formId={formId} label="Notify me" placeholder="your@email.com" />
    </div>
  )
}
