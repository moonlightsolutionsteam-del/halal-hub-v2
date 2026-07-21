"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, BookOpen, Send, Loader2, CheckCircle2, Clock, MessageCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

const QUICK_QUESTIONS = [
  "How do I make up missed Fajr prayers?",
  "Is it permissible to pray with shoes on?",
  "What breaks the fast during Ramadan?",
  "How do I perform Ghusl correctly?",
  "Can I combine Dhuhr and Asr when travelling?",
]

type Question = {
  id: string
  question: string
  status: string
  reply: string | null
  created_at: string
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function AskImamPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [question, setQuestion] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [questions, setQuestions] = React.useState<Question[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    supabase
      .from("imam_questions")
      .select("id, question, status, reply, created_at")
      .eq("user_id", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setQuestions((data as Question[] | null) ?? [])
        setLoading(false)
      })
  }, [user?.uid])

  const handleSubmit = async (q?: string) => {
    const text = (q ?? question).trim()
    if (!text) return
    if (!user?.uid) {
      toast({ title: "Sign in to ask a question", variant: "destructive" })
      return
    }
    setSubmitting(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from("imam_questions")
      .insert({ user_id: user.uid, question: text, status: "pending" })
      .select("id, question, status, reply, created_at")
      .single()

    if (error) {
      toast({ title: "Failed to submit", description: error.message, variant: "destructive" })
    } else {
      setQuestions(prev => [data as Question, ...prev])
      setQuestion("")
      toast({ title: "Question submitted!", description: "An Imam will respond shortly." })
    }
    setSubmitting(false)
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-2xl space-y-6 pb-24">
      <div>
        <Link href="/prayer-times" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-3 w-fit">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black">Ask an Imam</h1>
            <p className="text-xs text-muted-foreground font-bold">Submit your Islamic question for a scholarly response</p>
          </div>
        </div>
      </div>

      {/* Submit form */}
      <Card className="rounded-[2rem] border-none shadow-sm">
        <CardContent className="p-5 space-y-4">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Your Question</p>
          <Textarea
            placeholder="Type your question here… e.g. Is it permissible to pray while travelling by plane?"
            className="rounded-2xl bg-muted border-none resize-none min-h-[100px] font-medium text-sm"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
          <Button
            onClick={() => handleSubmit()}
            disabled={submitting || !question.trim()}
            className="w-full h-12 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg gap-2"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4" /> Submit Question</>}
          </Button>
        </CardContent>
      </Card>

      {/* Quick questions */}
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Common Questions</p>
        {QUICK_QUESTIONS.map((q, i) => (
          <button key={i} onClick={() => handleSubmit(q)}
            className="w-full text-left px-4 py-3 rounded-2xl bg-card hover:bg-muted transition-colors text-sm font-medium text-foreground shadow-sm flex items-center justify-between gap-3">
            {q}
            <Send className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>

      {/* Previous questions */}
      {!loading && questions.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Your Questions</p>
          {questions.map(q => (
            <Card key={q.id} className="rounded-2xl border-none shadow-sm">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold text-sm text-foreground flex-1">{q.question}</p>
                  <Badge className={`text-[9px] font-black uppercase shrink-0 border-none gap-1 ${
                    q.status === "answered"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950/40"
                  }`}>
                    {q.status === "answered" ? <CheckCircle2 className="h-2.5 w-2.5" /> : <Clock className="h-2.5 w-2.5" />}
                    {q.status}
                  </Badge>
                </div>
                {q.reply && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-3 border-l-2 border-emerald-400">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Imam's Response</p>
                    <p className="text-sm font-medium text-foreground">{q.reply}</p>
                  </div>
                )}
                <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                  <MessageCircle className="h-2.5 w-2.5" /> {timeAgo(q.created_at)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
