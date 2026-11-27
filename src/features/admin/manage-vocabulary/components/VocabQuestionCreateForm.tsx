import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { QuestionType } from '@/types/question.type'

type AnswerDraft = {
  id: number
  text: string
  audioFile: File | null
  isCorrect: boolean
}

const questionTypes = [
  { value: QuestionType.TEXT_TO_AUDIO, label: 'Câu hỏi chọn đáp án âm thanh' },
  { value: QuestionType.AUDIO_TO_TEXT, label: 'Câu hỏi nghe và chọn nghĩa của từ' },
  { value: QuestionType.MULTIPLE_CHOICE, label: 'Câu hỏi trắc nghiệm chữ' },
] as const

const createAnswer = (id: number): AnswerDraft => ({
  id,
  text: '',
  audioFile: null,
  isCorrect: false,
})

export function VocabQuestionCreateForm() {
  const navigate = useNavigate()
  const [type, setType] = useState<QuestionType>(QuestionType.TEXT_TO_AUDIO)
  const [title, setTitle] = useState('')
  const [questionContent, setQuestionContent] = useState('')
  const [answers, setAnswers] = useState<AnswerDraft[]>([createAnswer(1), createAnswer(2)])

  const usesAudioAnswers = type === QuestionType.TEXT_TO_AUDIO
  const usesQuestionContent = type !== QuestionType.AUDIO_TO_TEXT

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(-1)
  }

  const updateAnswer = (id: number, update: Partial<AnswerDraft>) => {
    setAnswers((current) => current.map((answer) =>
      answer.id === id ? { ...answer, ...update } : answer,
    ))
  }

  const addAnswer = () => {
    setAnswers((current) => current.length >= 3
      ? current
      : [...current, createAnswer(Math.max(...current.map((answer) => answer.id)) + 1)],
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border/50 bg-card p-6 shadow-xs">
      <h1 className="text-lg font-bold text-foreground">Thêm bài tập từ vựng</h1>

      <div className="mt-6 flex flex-col gap-2">
        <label htmlFor="vocab-question-type" className="text-sm font-semibold text-foreground">
          Loại bài tập
        </label>
        <select
          id="vocab-question-type"
          value={type}
          onChange={(event) => setType(event.target.value as QuestionType)}
          className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground md:max-w-lg"
        >
          {questionTypes.map((questionType) => (
            <option key={questionType.value} value={questionType.value}>
              {questionType.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="question-title" className="text-sm font-semibold text-foreground">
            Tiêu đề
          </label>
          <Input
            id="question-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Nhập tiêu đề bài tập"
            required
            className="h-10 bg-card"
          />
        </div>

        {usesQuestionContent && (
          <div className="flex flex-col gap-2">
            <label htmlFor="question-content" className="text-sm font-semibold text-foreground">
              Nội dung câu hỏi
            </label>
            <textarea
              id="question-content"
              value={questionContent}
              onChange={(event) => setQuestionContent(event.target.value)}
              placeholder="Nhập nội dung câu hỏi"
              required
              rows={3}
              className="w-full resize-y rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary/70"
            />
          </div>
        )}
      </div>

      <section className="mt-7">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Danh sách đáp án</h2>
            <p className="mt-1 text-xs text-muted-foreground">Có thể thêm tối đa 3 đáp án.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={addAnswer}
            disabled={answers.length >= 3}
            className="h-9"
          >
            + Thêm đáp án
          </Button>
        </div>

        <div className="space-y-3">
          {answers.map((answer, index) => (
            <div key={answer.id} className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <label htmlFor={`question-answer-${answer.id}`} className="mb-2 block text-xs font-medium text-muted-foreground">
                  Đáp án {index + 1}
                </label>
                {usesAudioAnswers ? (
                  <Input
                    id={`question-answer-${answer.id}`}
                    type="file"
                    accept="audio/*"
                    required
                    onChange={(event) => updateAnswer(answer.id, { audioFile: event.target.files?.[0] ?? null })}
                    className="h-10 bg-card file:mr-3"
                  />
                ) : (
                  <Input
                    id={`question-answer-${answer.id}`}
                    value={answer.text}
                    onChange={(event) => updateAnswer(answer.id, { text: event.target.value })}
                    placeholder="Nhập nội dung đáp án"
                    required
                    className="h-10 bg-card"
                  />
                )}
              </div>
              <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm text-foreground sm:pt-6">
                <Checkbox
                  checked={answer.isCorrect}
                  onCheckedChange={(checked) => updateAnswer(answer.id, { isCorrect: checked === true })}
                  aria-label={`Đánh dấu đáp án ${index + 1} là đáp án đúng`}
                />
                Đáp án đúng
              </label>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => navigate(-1)} className="h-10 px-6">
          Hủy
        </Button>
        <Button type="submit" className="h-10 px-6">
          Lưu đáp án
        </Button>
      </div>
    </form>
  )
}
