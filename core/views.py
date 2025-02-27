from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from .forms import RegisterForm, LoginForm, WaitlistForm, DeviceClassification
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
def home_view(request):
    return render(request, 'core/home.html')

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('profile')
    else:
        form = RegisterForm()
    return render(request, 'core/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('profile')
    else:
        form = LoginForm()
    return render(request, 'core/login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')

def profile_view(request):
    return render(request, 'core/profile.html')

def waitlist_view(request):
    if request.method == "POST":
        form = WaitlistForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({"success": True})
        return JsonResponse({"success": False, "errors": form.errors})
    
    form = WaitlistForm()
    return render(request, "core/home.html", {"form": form})

# @csrf_exempt
def classify_device(request):
    if request.method == 'POST':
        try:
            # Extract form data
            device_name = request.POST.get('deviceName')
            device_description = request.POST.get('deviceDescription')
            intended_use = request.POST.get('intendedUse')
            contact_name = request.POST.get('contactName')
            contact_email = request.POST.get('contactEmail')
            company_name = request.POST.get('companyName', '')
            
            # Create new device classification entry
            device = DeviceClassification.objects.create(
                device_name=device_name,
                device_description=device_description,
                intended_use=intended_use,
                contact_name=contact_name,
                contact_email=contact_email,
                company_name=company_name,
                status='pending'  # Initial status
            )
            
            return JsonResponse({
                'success': True,
                'message': 'Device information received successfully.'
            })
            
        except Exception as e:
            return JsonResponse({
                'success': False,
                'errors': str(e)
            })
    
    return JsonResponse({
        'success': False,
        'errors': 'Invalid request method'
    })

