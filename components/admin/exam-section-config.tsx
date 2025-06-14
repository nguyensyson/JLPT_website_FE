"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit, Settings, Save, X } from "lucide-react"

interface Question {
  id: number
  type: string
  content: string
  options: string[]
  correctAnswer: number
  points: number
}

interface ExamSectionConfigProps {
  sectionName: string
  sectionType?: "vocabulary" | "grammar" | "listening"
  questionCount?: number
  timeLimit?: number
  onSave?: (config: any) => void
}

export function ExamSectionConfig({
  sectionName,
  sectionType = "vocabulary", // Default value
  questionCount = 0,
  timeLimit = 30,
  onSave,
}: ExamSectionConfigProps) {
  const [open, setOpen] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [editingQuestion, setEditingQuestion] = useState<number | null>(null)
  const [newQuestion, setNewQuestion] = useState({
    type: "multiple_choice",
    content: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    points: 1,
  })

  const questionTypes = {
    vocabulary: [
      { value: "kanji_reading", label: "Đọc Kanji" },
      { value: "kanji_meaning", label: "Nghĩa Kanji" },
      { value: "vocabulary_usage", label: "Cách dùng từ vựng" },
      { value: "word_formation", label: "Cấu tạo từ" },
    ],
    grammar: [
      { value: "grammar_form", label: "Dạng ngữ pháp" },
      { value: "sentence_composition", label: "Sắp xếp câu" },
      { value: "text_grammar", label: "Ngữ pháp trong đoạn văn" },
      { value: "reading_comprehension", label: "Đọc hiểu" },
    ],
    listening: [
      { value: "task_based", label: "Nghe hiểu nhiệm vụ" },
      { value: "key_point", label: "Nghe hiểu điểm chính" },
      { value: "verbal_expression", label: "Nghe hiểu biểu đạt" },
      { value: "quick_response", label: "Phản ứng nhanh" },
    ],
  }

  // Get current question types with fallback
  const currentQuestionTypes = questionTypes[sectionType] || questionTypes.vocabulary

  const addQuestion = () => {
    if (newQuestion.content.trim()) {
      const question: Question = {
        id: Date.now(),
        type: newQuestion.type,
        content: newQuestion.content,
        options: newQuestion.options.filter((opt) => opt.trim() !== ""),
        correctAnswer: newQuestion.correctAnswer,
        points: newQuestion.points,
      }
      setQuestions([...questions, question])
      setNewQuestion({
        type: "multiple_choice",
        content: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        points: 1,
      })
    }
  }

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
    if (editingQuestion === id) {
      setEditingQuestion(null)
    }
  }

  const startEditQuestion = (question: Question) => {
    setEditingQuestion(question.id)
  }

  const cancelEditQuestion = () => {
    setEditingQuestion(null)
  }

  const saveEditQuestion = (questionId: number, updatedData: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === questionId ? { ...q, ...updatedData } : q)))
    setEditingQuestion(null)
  }

  const handleSave = () => {
    const config = {
      sectionName,
      sectionType,
      questionCount: questions.length,
      timeLimit,
      questions,
    }
    if (onSave) {
      onSave(config)
    }
    alert(`Đã lưu cấu hình cho ${sectionName} với ${questions.length} câu hỏi!`)
    setOpen(false)
  }

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(true)
  }

  // Component để chỉnh sửa câu hỏi
  const EditQuestionForm = ({ question }: { question: Question }) => {
    const [editData, setEditData] = useState({
      type: question.type,
      content: question.content,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      points: question.points,
    })

    const handleSaveEdit = () => {
      saveEditQuestion(question.id, editData)
    }

    return (
      <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-blue-800">Chỉnh sửa câu hỏi</h4>
            <div className="flex space-x-2">
              <Button type="button" size="sm" onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-700">
                <Save className="h-3 w-3 mr-1" />
                Lưu
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={cancelEditQuestion}>
                <X className="h-3 w-3 mr-1" />
                Hủy
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Loại câu hỏi</Label>
              <Select value={editData.type} onValueChange={(value) => setEditData({ ...editData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentQuestionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Điểm số</Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={editData.points}
                onChange={(e) => setEditData({ ...editData, points: Number.parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <div>
            <Label>Nội dung câu hỏi</Label>
            <Textarea
              value={editData.content}
              onChange={(e) => setEditData({ ...editData, content: e.target.value })}
              className="min-h-[80px]"
            />
          </div>

          <div>
            <Label>Các lựa chọn</Label>
            <div className="grid grid-cols-2 gap-2">
              {editData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder={`Lựa chọn ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...editData.options]
                      newOptions[index] = e.target.value
                      setEditData({ ...editData, options: newOptions })
                    }}
                  />
                  <input
                    type="radio"
                    name={`correctAnswer-${question.id}`}
                    checked={editData.correctAnswer === index}
                    onChange={() => setEditData({ ...editData, correctAnswer: index })}
                    className="w-4 h-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="rounded-lg" onClick={handleOpenModal}>
          <Settings className="h-4 w-4 mr-2" />
          Cấu hình
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cấu hình {sectionName}</DialogTitle>
          <DialogDescription>Thiết lập chi tiết câu hỏi và cấu trúc cho phần thi này</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Section Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin phần thi</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label>Số câu hỏi hiện tại</Label>
                <div className="text-2xl font-bold text-jlpt-red">{questions.length}</div>
              </div>
              <div>
                <Label>Thời gian</Label>
                <div className="text-2xl font-bold text-jlpt-red">{timeLimit} phút</div>
              </div>
            </CardContent>
          </Card>

          {/* Add New Question */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thêm câu hỏi mới</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Loại câu hỏi</Label>
                  <Select
                    value={newQuestion.type}
                    onValueChange={(value) => setNewQuestion({ ...newQuestion, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currentQuestionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Điểm số</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={newQuestion.points}
                    onChange={(e) => setNewQuestion({ ...newQuestion, points: Number.parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>

              <div>
                <Label>Nội dung câu hỏi</Label>
                <Textarea
                  placeholder="Nhập nội dung câu hỏi..."
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label>Các lựa chọn</Label>
                <div className="grid grid-cols-2 gap-2">
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder={`Lựa chọn ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options]
                          newOptions[index] = e.target.value
                          setNewQuestion({ ...newQuestion, options: newOptions })
                        }}
                      />
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={newQuestion.correctAnswer === index}
                        onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                        className="w-4 h-4"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">Chọn radio button để đánh dấu đáp án đúng</p>
              </div>

              <Button type="button" onClick={addQuestion} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Thêm câu hỏi
              </Button>
            </CardContent>
          </Card>

          {/* Questions List */}
          {questions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Danh sách câu hỏi ({questions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {questions.map((question, index) => (
                    <div key={question.id}>
                      {editingQuestion === question.id ? (
                        <EditQuestionForm question={question} />
                      ) : (
                        <div className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline">Câu {index + 1}</Badge>
                                <Badge variant="secondary">
                                  {currentQuestionTypes.find((t) => t.value === question.type)?.label || question.type}
                                </Badge>
                                <Badge variant="outline">{question.points} điểm</Badge>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{question.content}</p>
                              <div className="grid grid-cols-2 gap-1 text-xs">
                                {question.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className={`p-1 rounded ${optIndex === question.correctAnswer ? "bg-green-100 text-green-800" : "bg-gray-50"}`}
                                  >
                                    {optIndex + 1}. {option}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                onClick={() => startEditQuestion(question)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                onClick={() => removeQuestion(question.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy bỏ
            </Button>
            <Button type="button" onClick={handleSave} className="bg-jlpt-red hover:bg-red-800">
              Lưu cấu hình
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
