from django.db import models

# Create your models here.

#이거가 데이터를연결해주는거넹
class Patient(models.Model):
    chart_no = models.CharField("챠트번호", max_length=20, unique=True)
    name = models.CharField("성명", max_length=50)
    birth_date = models.DateField("생년월일", null=True, blank=True)
    gender = models.CharField(
        "성별",
        max_length=1,
        choices=(
            ("M", "남"),
            ("F", "여"),
        ),
        null=True,
        blank=True,
    )
    phone = models.CharField("연락처", max_length=20, null=True, blank=True)
    address = models.CharField("주소", max_length=200, null=True, blank=True)

    def __str__(self):
        return f"{self.chart_no} - {self.name}"

class Visit(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="visits")
    visit_date = models.DateTimeField("내원일시", auto_now_add=True)
    chief_complaint = models.CharField("주호소", max_length=200, null=True, blank=True)
    diagnosis = models.CharField("진단명", max_length=200, null=True, blank=True)
    memo = models.TextField("메모", null=True, blank=True)

    def __str__(self):
        return f"{self.patient.name} / {self.visit_date.strftime('%Y-%m-%d')}"

    class Meta:
        ordering = ["-visit_date"]

class PrescriptionItem(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name="prescriptions")
    drug_name = models.CharField("약품명", max_length=100)
    dose = models.CharField("1회량", max_length=50, null=True, blank=True)
    frequency = models.CharField("횟수", max_length=50, null=True, blank=True)
    days = models.IntegerField("일수", null=True, blank=True)
    instruction = models.CharField("복약법", max_length=200, null=True, blank=True)

    def __str__(self):
        return f"{self.drug_name} ({self.visit.patient.name})"
    

#이번엔 자료실 추가 
class DocumentCategory(models.Model):
    "자료실 카테고리"    
    name = models.CharField("카테고리명", max_length=100)

    def __str__(self):
        return self.name    

class Document(models.Model):
    "자료실 문서/파일"
    title = models.CharField("제목", max_length=200)
    description = models.TextField("설명", blank=True)
    category = models.ForeignKey(
        DocumentCategory,
        verbose_name="카테고리",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    file = models.FileField("첨부파일", upload_to="uploads/docs/%Y/%m/%d/")
    created_at = models.DateTimeField("등록일자", auto_now_add=True)

    def __str__(self):
        return self.title
    
#게시판 추가
class SelfHelp(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.FileField(upload_to="uploads/help_images/", blank=True, null=True)
    attach_file = models.FileField(upload_to="uploads/help_docs/", blank=True, null=True)
    category = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
