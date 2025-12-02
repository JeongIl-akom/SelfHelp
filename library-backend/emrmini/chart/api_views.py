from rest_framework import generics, permissions
from .models import Patient, Visit, Document, SelfHelp
from .serializers import PatientSerializer, VisitSerializer, DocumentSerializer, SelfHelpSerializer
from rest_framework.generics import ListAPIView
#업로드
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import DocumentUploadSerializer, SelfHelpUploadSerializer
from rest_framework.generics import RetrieveAPIView



class PatientListAPI(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]


class PatientDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]


class VisitDetailAPI(generics.RetrieveAPIView):
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer
    permission_classes = [permissions.IsAuthenticated]

#자료실 - 다운로드
class DocumentListAPI(ListAPIView):
    serializer_class = DocumentSerializer

    def get_queryset(self):
        qs = Document.objects.all().order_by("-created_at")

        category = self.request.GET.get("category")
        q = self.request.GET.get("q")

        if category:
            qs = qs.filter(category_id=category)

        if q:
            qs = qs.filter(title__icontains=q)

        return qs

#자료실 - 업로드    
class DocumentUploadAPI(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = DocumentUploadSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
#게시판
class SelfHelpListAPI(ListAPIView):
    serializer_class = SelfHelpSerializer

    def get_queryset(self):
        qs = SelfHelp.objects.all().order_by("-created_at")

        q = self.request.GET.get("q")
        category = self.request.GET.get("category")

        if q:
            qs = qs.filter(title__icontains=q)

        if category:
            qs = qs.filter(category=category)

        return qs
    
#게시판 페이지업로드
class SelfHelpUploadAPI(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = SelfHelpUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    

#게시판 - 상세페이지
class SelfHelpDetailAPI(RetrieveAPIView):
    queryset = SelfHelp.objects.all()
    serializer_class = SelfHelpSerializer
    lookup_field = "id"

#게시판 - 수정페이지
class SelfHelpModifiAPI(RetrieveAPIView):
    queryset = SelfHelp.objects.all()
    serializer_class = SelfHelpSerializer
    lookup_field = "id"

#자료실 - 상세페이지
class DocumentDetailAPI(RetrieveAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    lookup_field = "id"



    