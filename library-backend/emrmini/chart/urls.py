from django.urls import path
from . import views, api_views

app_name = "chart"

urlpatterns = [
    #챠트?
    path("patients/", views.patient_list, name="patient_list"),
    path("patients/<int:pk>/", views.patient_detail, name="patient_detail"),    
    path("visits/<int:pk>/", views.visit_detail, name="visit_detail"),

    # 자료실
    path("library/", views.document_list, name="document_list"),
    # 자료실 - 다운로드
    path("api/library/", api_views.DocumentListAPI.as_view(), name="document_list_api"),
    # 자료실 - 업로드
    path("api/library/upload/", api_views.DocumentUploadAPI.as_view(), name="document_upload_api"),
    # 자료실 - 상세페이지
    path("api/library/<int:id>/", api_views.DocumentDetailAPI.as_view(), name="document_detail_api"),

    #api 
    path("api/patients/", api_views.PatientListAPI.as_view()),
    path("api/patients/<int:pk>/", api_views.PatientDetailAPI.as_view()),
    path("api/visits/<int:pk>/", api_views.VisitDetailAPI.as_view()),
    path("api/chat/", views.chat_ai, name="chat_ai"),

    #게시판
    path("api/selfhelp/", api_views.SelfHelpListAPI.as_view()),

    #게시판 - 업로드
    path("api/selfhelp/upload/", api_views.SelfHelpUploadAPI.as_view(), name="selfhelp_upload_api"),
    #게시판 - 상세페이지
    path("api/selfhelp/<int:id>/", api_views.SelfHelpDetailAPI.as_view(), name="selfhelp_detail_api"),
    #게시판- 수정페이지
    path("api/selfhelp/modifi/", api_views.SelfHelpDetailAPI.as_view(), name="selfhelp_modi_api"),

    



    
    
]