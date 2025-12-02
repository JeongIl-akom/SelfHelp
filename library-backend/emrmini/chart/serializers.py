from rest_framework.generics import RetrieveAPIView
from rest_framework import serializers
from .models import Patient, Visit, PrescriptionItem, Document, DocumentCategory, SelfHelp

class PrescriptionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrescriptionItem
        fields = "__all__"


class VisitSerializer(serializers.ModelSerializer):
    prescriptions = PrescriptionItemSerializer(many=True, read_only=True)

    class Meta:
        model = Visit
        fields = "__all__"


class PatientSerializer(serializers.ModelSerializer):
    visits = VisitSerializer(many=True, read_only=True)

    class Meta:
        model = Patient
        fields = "__all__"

#자료실 - 다운로드 
class DocumentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentCategory
        fields = ["id", "name"]

class DocumentSerializer(serializers.ModelSerializer):
    category = DocumentCategorySerializer()

    class Meta:
        model = Document
        fields = ["id", "title", "description", "category", "file", "created_at"]

#자료실 - 업로드
class DocumentUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ["title", "description", "category", "file"]

#게시판 - 리스트표시 
class SelfHelpSerializer(serializers.ModelSerializer):
    class Meta:
        model = SelfHelp
        fields = ["id", "title", "description", "image", "attach_file", "category", "created_at"]


#게시판 - 업로드
class SelfHelpUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = SelfHelp
        fields = ["title", "description", "image", "attach_file", "category"]

#게시판 - 자료수정
class SelfHelpModifi(serializers.ModelSerializer):
    class Meta:
        model = SelfHelp
        fields = ["title", "description", "image", "attach_file", "category"]