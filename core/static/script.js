document.addEventListener("DOMContentLoaded", function() {
    let openBtn = document.getElementById("openWaitlist");
    let closeBtn = document.getElementById("closeWaitlist");
    let overlay = document.getElementById("waitlistOverlay");
    let modal = document.getElementById("waitlistModal");
    let waitlistForm = document.getElementById("waitlistForm");
    let successMessage = document.getElementById("successMessage");

    // Open the modal
    openBtn.addEventListener("click", function() {
        overlay.style.display = "block";
        modal.style.display = "block";
    });

    // Close the modal when clicking X button
    closeBtn.addEventListener("click", function() {
        overlay.style.display = "none";
        modal.style.display = "none";
    });

    // Close the modal when clicking outside of it
    overlay.addEventListener("click", function() {
        overlay.style.display = "none";
        modal.style.display = "none";
    });

    // Handle form submission
    waitlistForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        let formData = new FormData(this);
        let url = this.getAttribute("data-url"); // Get the correct URL from HTML

        fetch(url, {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                successMessage.style.display = "block";
                setTimeout(() => {
                    overlay.style.display = "none";
                    modal.style.display = "none";
                    successMessage.style.display = "none";
                }, 2000);
            } else {
                alert("Error: " + JSON.stringify(data.errors));
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Modal Elements
    const openClassifyBtn = document.getElementById("openClassify");
    const closeClassifyBtn = document.getElementById("closeClassify");
    const classifyOverlay = document.getElementById("classifyOverlay");
    const classifyModal = document.getElementById("classifyModal");
    const classificationProgress = document.getElementById("classificationProgress");
    
    // Step Content Elements
    const step1Content = document.getElementById("step1Content");
    const step2Content = document.getElementById("step2Content");
    const step3Content = document.getElementById("step3Content");
    const step4Content = document.getElementById("step4Content");
    const successContent = document.getElementById("successContent");
    
    // Step Indicators
    const step1Indicator = document.getElementById("step1Indicator");
    const step2Indicator = document.getElementById("step2Indicator");
    const step3Indicator = document.getElementById("step3Indicator");
    const step4Indicator = document.getElementById("step4Indicator");
    
    // Navigation Buttons
    const step1Continue = document.getElementById("step1Continue");
    const step2Back = document.getElementById("step2Back");
    const step2Continue = document.getElementById("step2Continue");
    const step3Back = document.getElementById("step3Back");
    const step3Continue = document.getElementById("step3Continue");
    const step4Back = document.getElementById("step4Back");
    const submitClassification = document.getElementById("submitClassification");
    
    // Form Data Object
    let formData = {};
    
    // Open Classification Modal
    openClassifyBtn.addEventListener("click", function() {
        classifyOverlay.style.display = "block";
        classifyModal.style.display = "block";
        // Reset to first step when opening
        showStep(1);
    });
    
    // Close Classification Modal
    closeClassifyBtn.addEventListener("click", closeModal);
    classifyOverlay.addEventListener("click", closeModal);
    
    function closeModal() {
        classifyOverlay.style.display = "none";
        classifyModal.style.display = "none";
    }
    
    // Navigation Functions
    step1Continue.addEventListener("click", function() {
        // Collect data from step 1
        formData.intended_purpose = document.getElementById("intendedPurpose").value;
        formData.target_conditions = document.getElementById("targetConditions").value;
        
        // Validate
        if (!formData.intended_purpose || !formData.target_conditions) {
            alert("Please fill in all fields before continuing.");
            return;
        }
        
        showStep(2);
    });
    
    step2Back.addEventListener("click", function() {
        showStep(1);
    });
    
    step2Continue.addEventListener("click", function() {
        // Collect data from step 2
        formData.operation_mechanism = document.getElementById("operationMechanism").value;
        formData.has_software = document.getElementById("hasSoftware").checked;
        formData.energy_source = document.getElementById("energySource").value;
        
        // Validate
        if (!formData.operation_mechanism) {
            alert("Please describe how the device operates before continuing.");
            return;
        }
        
        showStep(3);
    });
    
    step3Back.addEventListener("click", function() {
        showStep(2);
    });
    
    step3Continue.addEventListener("click", function() {
        // Collect data from step 3
        formData.potential_risks = document.getElementById("potentialRisks").value;
        formData.supports_life = document.getElementById("supportsLife").checked;
        formData.serious_consequences = document.getElementById("seriousConsequences").checked;
        
        // Validate
        if (!formData.potential_risks) {
            alert("Please describe potential risks before continuing.");
            return;
        }
        
        showStep(4);
    });
    
    step4Back.addEventListener("click", function() {
        showStep(3);
    });
    
    submitClassification.addEventListener("click", function() {
        // Collect contact info and markets
        formData.contact_name = document.getElementById("contactName").value;
        formData.contact_email = document.getElementById("contactEmail").value;
        formData.company_name = document.getElementById("companyName").value;
        
        // Collect selected target markets
        formData.target_markets = [];
        document.querySelectorAll('input[name="target_markets"]:checked').forEach(function(checkbox) {
            formData.target_markets.push(checkbox.value);
        });
        
        // Validate required fields
        if (!formData.contact_name || !formData.contact_email) {
            alert("Please provide your contact information.");
            return;
        }
        
        // Submit the form data
        submitForm();
    });
    
    function showStep(stepNumber) {
        // Hide all steps
        step1Content.style.display = "none";
        step2Content.style.display = "none";
        step3Content.style.display = "none";
        step4Content.style.display = "none";
        successContent.style.display = "none";
        
        // Remove active class from all indicators
        step1Indicator.classList.remove("active");
        step2Indicator.classList.remove("active");
        step3Indicator.classList.remove("active");
        step4Indicator.classList.remove("active");
        
        // Show the selected step
        if (stepNumber === 1) {
            step1Content.style.display = "block";
            step1Indicator.classList.add("active");
            classificationProgress.style.width = "25%";
        } else if (stepNumber === 2) {
            step2Content.style.display = "block";
            step2Indicator.classList.add("active");
            classificationProgress.style.width = "50%";
        } else if (stepNumber === 3) {
            step3Content.style.display = "block";
            step3Indicator.classList.add("active");
            classificationProgress.style.width = "75%";
        } else if (stepNumber === 4) {
            step4Content.style.display = "block";
            step4Indicator.classList.add("active");
            classificationProgress.style.width = "100%";
        } else if (stepNumber === 5) { // Success
            successContent.style.display = "block";
            classificationProgress.style.width = "100%";
        }
    }
    
    function submitForm() {
        // Create FormData object for submission
        const submitData = new FormData();
        
        // Add all form data to the FormData object
        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                // For arrays like target_markets
                formData[key].forEach(value => {
                    submitData.append(key + '[]', value);
                });
            } else {
                submitData.append(key, formData[key]);
            }
        }
        
        // Add CSRF token
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        // Submit the data using fetch
        fetch("{% url 'classify_device' %}", {
            method: "POST",
            headers: {
                'X-CSRFToken': csrftoken
            },
            body: submitData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showStep(5); // Show success message
                // Reset form data
                formData = {};
                // Close modal after 3 seconds
                setTimeout(closeModal, 3000);
            } else {
                alert("Error: " + JSON.stringify(data.errors));
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        });
    }
});