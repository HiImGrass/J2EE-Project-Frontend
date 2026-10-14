import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { CreateVocabularyRequest } from '@/types/vocabulary'
import { FileInputRow } from './FileInputRow'

interface VocabCreateFormProps {
  topicId?: number
  initialData?: Partial<CreateVocabularyRequest>
  onSubmit?: (data: CreateVocabularyRequest) => void
  onCancel?: () => void
  className?: string
}

export function VocabCreateForm({
  topicId,
  initialData,
  onSubmit,
  onCancel,
  className,
}: VocabCreateFormProps) {
  const navigate = useNavigate()

  const [word, setWord] = useState(initialData?.word || '')
  const [pronunciation, setPronunciation] = useState(initialData?.pronunciation || '')
  const [partOfSpeech, setPartOfSpeech] = useState(initialData?.partOfSpeech || '')
  const [meaning, setMeaning] = useState(initialData?.meaning || '')
  const [example, setExample] = useState(initialData?.example || '')

  const [audioFile, setAudioFile] = useState<File | null>(initialData?.audioFile || null)
  const [audioFileName, setAudioFileName] = useState(initialData?.audioFileName || '')

  const [imageFile, setImageFile] = useState<File | null>(initialData?.imageFile || null)
  const [imageFileName, setImageFileName] = useState(initialData?.imageFileName || '')

  const [submitted, setSubmitted] = useState(false)

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      navigate(-1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData: CreateVocabularyRequest = {
      word: word.trim(),
      pronunciation: pronunciation.trim(),
      partOfSpeech: partOfSpeech.trim(),
      meaning: meaning.trim(),
      example: example.trim(),
      audioFile,
      audioFileName: audioFile?.name || audioFileName,
      imageFile,
      imageFileName: imageFile?.name || imageFileName,
    }

    if (onSubmit) {
      onSubmit(formData)
    } else {
      console.log('Tạo từ vựng thành công:', { topicId, ...formData })
      setSubmitted(true)
      setTimeout(() => {
        handleCancel()
      }, 1000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-4', className)}>
      {submitted && (
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
          Lưu từ vựng thành công! Đang quay lại...
        </div>
      )}

      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-xs">
        <h2 className="text-base font-bold text-foreground">Thêm từ vựng</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2 lg:gap-x-16">
          <div className="flex items-center gap-4">
            <label
              htmlFor="vocab-word"
              className="w-24 shrink-0 text-sm font-semibold text-foreground select-none"
            >
              Từ vựng
            </label>
            <div className="min-w-0 flex-1">
              <Input
                id="vocab-word"
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder=""
                required
                className="h-10 border-input bg-card text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-xs">
        <h2 className="text-base font-bold text-foreground">Thông tin từ vựng</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2 lg:gap-x-16">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <label
                htmlFor="vocab-pronunciation"
                className="w-24 shrink-0 text-sm font-semibold text-foreground select-none"
              >
                Phiên âm
              </label>
              <div className="min-w-0 flex-1">
                <Input
                  id="vocab-pronunciation"
                  type="text"
                  value={pronunciation}
                  onChange={(e) => setPronunciation(e.target.value)}
                  placeholder=""
                  className="h-10 border-input bg-card text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label
                htmlFor="vocab-pos"
                className="w-24 shrink-0 text-sm font-semibold text-foreground select-none"
              >
                Từ loại
              </label>
              <div className="min-w-0 flex-1">
                <Input
                  id="vocab-pos"
                  type="text"
                  value={partOfSpeech}
                  onChange={(e) => setPartOfSpeech(e.target.value)}
                  placeholder="Từ loại: n, v, adj, adv,..."
                  className="h-10 border-input bg-card text-sm placeholder:text-muted-foreground/70"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label
                htmlFor="vocab-meaning"
                className="w-24 shrink-0 text-sm font-semibold text-foreground select-none"
              >
                Nghĩa
              </label>
              <div className="min-w-0 flex-1">
                <Input
                  id="vocab-meaning"
                  type="text"
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                  placeholder=""
                  required
                  className="h-10 border-input bg-card text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <label
                htmlFor="vocab-example"
                className="w-24 shrink-0 text-sm font-semibold text-foreground select-none"
              >
                Ví dụ
              </label>
              <div className="min-w-0 flex-1">
                <Input
                  id="vocab-example"
                  type="text"
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                  placeholder=""
                  className="h-10 border-input bg-card text-sm"
                />
              </div>
            </div>

            <FileInputRow
              id="vocab-audio"
              label="Âm thanh"
              placeholder="Chọn tệp"
              accept="audio/*"
              file={audioFile}
              fileName={audioFileName}
              onChange={(file) => {
                setAudioFile(file)
                if (file) setAudioFileName(file.name)
              }}
            />

            <FileInputRow
              id="vocab-image"
              label="Ảnh"
              placeholder="Chọn tệp"
              accept="image/*"
              file={imageFile}
              fileName={imageFileName}
              onChange={(file) => {
                setImageFile(file)
                if (file) setImageFileName(file.name)
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="h-10 cursor-pointer border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
        >
          Hủy
        </Button>
        <Button
          type="submit"
          className="h-10 cursor-pointer bg-primary px-6 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
        >
          Lưu từ vựng
        </Button>
      </div>
    </form>
  )
}
