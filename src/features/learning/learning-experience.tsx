"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, Clock3, RotateCcw, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { assetTypePrimer, beginnerLessons, quizQuestion, reviewConcepts } from "./learning-data";
import { InvestmentSimulator } from "./investment-simulator";

const STORAGE_KEY = "investment-os-learning-progress";
const DEFAULT_COMPLETED = ["why-invest"];
const DEFAULT_STATE = JSON.stringify({ completed: DEFAULT_COMPLETED, reviewed: [] });
const LEARNING_EVENT = "investment-os-learning-change";

type StoredLearningState = {
  completed: string[];
  reviewed: string[];
};

function subscribeToLearningState(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LEARNING_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LEARNING_EVENT, callback);
  };
}

function getLearningSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_STATE;
}

function parseLearningState(snapshot: string): StoredLearningState {
  try {
    const parsed = JSON.parse(snapshot) as StoredLearningState;
    if (!Array.isArray(parsed.completed) || !Array.isArray(parsed.reviewed)) return JSON.parse(DEFAULT_STATE) as StoredLearningState;
    return parsed;
  } catch {
    return JSON.parse(DEFAULT_STATE) as StoredLearningState;
  }
}

function saveLearningState(state: StoredLearningState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(LEARNING_EVENT));
}

/**
 * LearningExperience turns a course list into a repeatable loop: continue one
 * lesson, retrieve older concepts, then receive visible progress feedback.
 */
export function LearningExperience() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [completedLessonId, setCompletedLessonId] = useState<string | null>(null);
  const snapshot = useSyncExternalStore(subscribeToLearningState, getLearningSnapshot, () => DEFAULT_STATE);
  const { completed, reviewed } = useMemo(() => parseLearningState(snapshot), [snapshot]);

  const nextLesson = beginnerLessons.find((lesson) => !completed.includes(lesson.id)) ?? beginnerLessons[0];
  const displayedLesson = beginnerLessons.find((lesson) => lesson.id === completedLessonId) ?? nextLesson;
  const progress = Math.round((completed.length / beginnerLessons.length) * 100);
  const pendingReviews = reviewConcepts.filter((concept) => !reviewed.includes(concept.id));
  const quizIsCorrect = selectedAnswer === quizQuestion.correct;

  const progressMessage = useMemo(() => {
    if (completed.length >= beginnerLessons.length) return "基础路径已完成，可以开始建立自己的研究框架。";
    if (completed.length >= 4) return "你已经能区分主要投资工具，下一步开始理解风险。";
    return "先建立地图，再考虑买什么。你正在打好最重要的基础。";
  }, [completed.length]);

  function completeCurrentLesson() {
    setCompletedLessonId(nextLesson.id);
    const nextCompleted = completed.includes(nextLesson.id) ? completed : [...completed, nextLesson.id];
    saveLearningState({ completed: nextCompleted, reviewed });
  }

  function markReviewed(id: string) {
    const nextReviewed = reviewed.includes(id) ? reviewed : [...reviewed, id];
    saveLearningState({ completed, reviewed: nextReviewed });
  }

  return (
    <div className="grid gap-10">
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_340px]">
        <Card className="order-2 border-primary/20 bg-card/95 lg:order-1">
          <CardContent className="p-5 lg:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="positive">继续学习</Badge>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="size-3.5" />{displayedLesson.duration}</span>
            </div>
            <h3 className="mt-5 max-w-2xl text-2xl font-semibold leading-8 lg:text-3xl">{displayedLesson.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{displayedLesson.description}</p>

            {displayedLesson.id === "asset-types" ? (
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {assetTypePrimer.map((asset) => (
                  <div key={asset.name} className="rounded-lg border border-border/70 bg-secondary/35 p-3">
                    <p className="font-semibold">{asset.name}</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{asset.ownership}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {completedLessonId ? (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-lg border border-positive/20 bg-positive-soft/55 p-4" role="status">
                <p className="inline-flex items-center gap-2 font-semibold text-positive"><CheckCircle2 className="size-4" />今天的学习已记录</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">进度已经保存。明天系统会把容易忘记的概念放进复习队列，而不是让你从头再看。</p>
              </motion.div>
            ) : (
              <Button className="mt-6" onClick={completeCurrentLesson} variant="primary">完成今日学习<ArrowRight className="size-4" /></Button>
            )}
          </CardContent>
        </Card>

        <Card className="order-1 lg:order-2">
          <CardContent className="p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">投资入门路径</p>
              <span className="font-mono text-sm text-primary">{progress}%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary" aria-label={`学习进度 ${progress}%`}>
              <motion.div className="h-full rounded-full bg-primary" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.2 }} />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{progressMessage}</p>
            <div className="mt-6 grid grid-cols-3 divide-x divide-border/75 border-y border-border/75 py-3 text-center">
              <div><p className="text-xl font-semibold tabular-nums">{completed.length}</p><p className="mt-1 text-xs text-muted-foreground">已学概念</p></div>
              <div><p className="text-xl font-semibold tabular-nums">{pendingReviews.length}</p><p className="mt-1 text-xs text-muted-foreground">待复习</p></div>
              <div><p className="text-xl font-semibold tabular-nums">4</p><p className="mt-1 text-xs text-muted-foreground">连续天数</p></div>
            </div>
          </CardContent>
        </Card>
      </section>

      <InvestmentSimulator />

      <section>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-medium text-primary">学习地图</p><h3 className="mt-2 text-2xl font-semibold">先认识工具，再学习判断</h3></div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">顺序经过设计。小白不需要先学复杂指标，先知道自己买的是什么。</p>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border/80 bg-card/75">
          {beginnerLessons.map((lesson, index) => {
            const isComplete = completed.includes(lesson.id);
            const isCurrent = lesson.id === nextLesson.id;
            const Icon = lesson.icon;
            return (
              <div key={lesson.id} className={cn("flex items-start gap-4 border-t border-border/70 p-4 first:border-t-0 sm:items-center", isCurrent && "bg-primary/[0.045]") }>
                <div className={cn("grid size-9 shrink-0 place-items-center rounded-md border", isComplete ? "border-primary/25 bg-positive-soft text-primary" : "border-border/80 bg-secondary/55 text-muted-foreground")}>{isComplete ? <Check className="size-4" /> : <Icon className="size-4" />}</div>
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-medium">{lesson.title}</p>{isCurrent ? <Badge variant="neutral">下一课</Badge> : null}</div><p className="mt-1 text-sm leading-5 text-muted-foreground">{lesson.description}</p></div>
                <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">{index + 1} / {beginnerLessons.length} · {lesson.duration}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
        <Card>
          <CardContent className="p-5 lg:p-6">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium text-primary">间隔复习</p><h3 className="mt-2 text-2xl font-semibold">今天有 {pendingReviews.length} 个概念值得再想一次</h3></div><RotateCcw className="size-5 text-muted-foreground" /></div>
            <div className="mt-5 grid gap-3">
              {pendingReviews.length ? pendingReviews.map((concept) => (
                <ReviewItem key={concept.id} concept={concept} onRemember={() => markReviewed(concept.id)} />
              )) : (
                <div className="rounded-lg border border-positive/20 bg-positive-soft/45 p-5"><p className="font-semibold text-positive">今日复习完成</p><p className="mt-2 text-sm leading-6 text-muted-foreground">没有连续刷题。系统会在更容易遗忘的时候，再把这些概念带回来。</p></div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-ai/20">
          <CardContent className="p-5 lg:p-6">
            <p className="inline-flex items-center gap-2 text-xs font-medium text-ai-foreground"><Sparkles className="size-4" />理解检查</p>
            <h3 className="mt-3 text-lg font-semibold leading-7">{quizQuestion.prompt}</h3>
            <div className="mt-5 grid gap-2">
              {quizQuestion.options.map((option) => (
                <button key={option} type="button" onClick={() => setSelectedAnswer(option)} className={cn("min-h-11 rounded-lg border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", selectedAnswer === option ? "border-primary/40 bg-positive-soft/55" : "border-border/75 bg-card hover:bg-secondary/55")}>{option}</button>
              ))}
            </div>
            {selectedAnswer ? <p className={cn("mt-4 text-sm leading-6", quizIsCorrect ? "text-positive" : "text-negative")} role="status">{quizIsCorrect ? "理解正确。" : "再想一下工具持有的资产范围。"} <span className="text-muted-foreground">{quizQuestion.explanation}</span></p> : <p className="mt-4 text-xs text-muted-foreground">不用猜涨跌，只检查自己是否真正理解。</p>}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ReviewItem({ concept, onRemember }: { concept: (typeof reviewConcepts)[number]; onRemember: () => void }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="rounded-lg border border-border/70 bg-secondary/30 p-4">
      <Badge variant="outline">{concept.term}</Badge>
      <p className="mt-3 font-medium leading-6">{concept.prompt}</p>
      {revealed ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><p className="mt-3 text-sm leading-6 text-muted-foreground">{concept.answer}</p><Button className="mt-4" onClick={onRemember} size="sm" variant="secondary">我记住了<Check className="size-4" /></Button></motion.div> : <Button className="mt-4" onClick={() => setRevealed(true)} size="sm" variant="ghost">想一想，再看答案</Button>}
    </div>
  );
}
