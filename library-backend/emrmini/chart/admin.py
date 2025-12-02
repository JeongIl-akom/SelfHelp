from django.contrib import admin
from .models import Patient, Visit, PrescriptionItem, Document, DocumentCategory

admin.site.register(Patient)
admin.site.register(Visit)
admin.site.register(PrescriptionItem)


@admin.register(DocumentCategory)
class DocumentCategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "created_at")
    list_filter = ("category", "created_at")
    search_fields = ("title", "description")