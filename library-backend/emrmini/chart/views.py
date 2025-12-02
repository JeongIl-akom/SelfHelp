from django.shortcuts import render, get_object_or_404
from .models import Patient, Visit, Document, DocumentCategory

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from openai import OpenAI

def patient_list(request):
    """환자 목록 화면"""
    q = request.GET.get("q", "")
    if q:
        patients = Patient.objects.filter(name__icontains=q)
    else:
        patients = Patient.objects.all().order_by("name")

    context = {
        "patients": patients,
        "q": q,
    }
    return render(request, "chart/patient_list.html", context)


def patient_detail(request, pk):
    """환자 상세 + 방문 목록"""
    patient = get_object_or_404(Patient, pk=pk)
    visits = patient.visits.all()  # related_name="visits"

    context = {
        "patient": patient,
        "visits": visits,
    }
    return render(request, "chart/patient_detail.html", context)

def visit_detail(request, pk):
    """방문 상세 + 처방 내역"""
    visit = get_object_or_404(Visit, pk=pk)
    prescriptions = visit.prescriptions.all()

    context = {
        "visit": visit,
        "prescriptions": prescriptions,
    }
    return render(request, "chart/visit_detail.html", context)

#OpenAI 추가
@api_view(["POST"])
def chat_ai(request):
    message = request.data.get("message","").strip()
    if not message:
        return Response({"error": "message 필드가 비어있음"}, status=400)
    
    client = OpenAI(api_key=settings.OPENAI_API_KEY)

    system_prompt = "당신은 한의원 EMR에 붙어있는 AI 어시스턴스입니다."

    completion = client.responses.create(
        model="gpt-4.1-mini",
        input=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message},
        ],
    )

    reply_text = completion.output[0].content[0].text
    return Response({"reply": reply_text})

def document_list(request):
    """자료실 목록"""
    category_id = request.GET.get("category")
    q = request.GET.get("q", "")

    docs = Document.objects.all().order_by("-created_at")
    categories = DocumentCategory.objects.all()

    if category_id:
        docs = docs.filter(category_id=category_id)

    if q:
        docs = docs.filter(title__icontains=q)

    context = {
        "documents": docs,
        "categories": categories,
        "selected_category": int(category_id) if category_id else None,
        "q": q,
    }
    return render(request, "chart/document_list.html", context)