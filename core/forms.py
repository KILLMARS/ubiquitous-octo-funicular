from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import CustomUser, WaitlistEntry, DeviceClassification

class RegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password1', 'password2']

class LoginForm(AuthenticationForm):
    username = forms.CharField(label='Email / Username')

class WaitlistForm(forms.ModelForm):
    class Meta:
        model = WaitlistEntry
        fields = ['name', 'email']

class DeviceClassificationForm(forms.ModelForm):
    class Meta:
        model = DeviceClassification
        fields = [
            'device_name',
            'device_description', 
            'intended_use', 
            'contact_name', 
            'contact_email', 
            'company_name'
        ]
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Optional: Add CSS classes, placeholders, or other attributes to form fields
        self.fields['device_name'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'e.g., Glucose Monitor'
        })
        self.fields['device_description'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Describe your device\'s purpose and functionality'
        })
        self.fields['intended_use'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'What is the intended use of your device?'
        })
        self.fields['contact_name'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Your full name'
        })
        self.fields['contact_email'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'your@email.com'
        })
        self.fields['company_name'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Your company',
            'required': False
        })
