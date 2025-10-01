document.addEventListener('DOMContentLoaded', () => {
  const cardDetails = {
    "gesture-details": {
      title: "1. Gesture",
      content: `
              <p>Gesture encompasses the physical movements and visual signals employed to convey 'भाव'.</p>
              <p><strong>Systematic Movements (like Dance):</strong> Highly codified movements, such as those found in classical Indian dance, are meticulously choreographed to express specific emotions, narratives, and philosophical ideas. The Natyashastra and Agama texts explain Angikas and Mudras in detail.</p>
              <p><strong>Nonsystematic Movements:</strong> These pertain to quotidian body language, encompassing subtle postural adjustments, spontaneous actions, and general bodily movements that instinctively communicate an individual's internal state.</p>
              <p><strong>Sight:</strong> It is a key way to express our intentions and emotions. His eyesight conveys the truth, despite the fact that he speaks lies. It is explained in the Ramayana and the Mahabharata.</p>
          `,
      color: "var(--accent-green)",
    },
    "environment-details": {
      title: "2. Environment",
      content: `
              <p>The environment and surrounding contexts significantly shape how intention is manifested and perceived. At times, the environment itself communicates intent without the need for words or gestures.</p>
              <p><strong>Situation/Surroundings:</strong> The broader context and setting can express intention directly. For instance, a decorated home conveys welcome, while a neglected space can communicate indifference.</p>
              <p><strong>Subtle Elements (Tanmatras):</strong> When a person wants to express their intention using tanmatras (sound, touch, form, taste, and smell), these serve as the tools for that expression.</p>
              <ul>
                  <li><strong>Smell (Gandha):</strong> The fragrance of incense or flowers communicates purity, devotion, or welcome.</li>
                  <li><strong>Taste (Rasa):</strong> Sweet offerings may express affection; bitterness or refusal to share food can express hostility.</li>
                  <li><strong>Touch (Sparśa):</strong> A breeze or a comfortable seat conveys ease and concern, while a rough or harsh texture may indicate disregard.</li>
                  <li><strong>Color (Rūpa):</strong> Bright colors can convey happiness or celebration, while dark colors can convey fear, secrecy, or solemnity.</li>
              </ul>
              <p><strong>Silence:</strong> 'Silence' too is an autonomous expression. Pauses, stillness, or absence of sound can indicate agreement, rejection, tension, or deep thought.</p>
          `,
      color: "var(--accent-environment)",
    },
    "sound-details": {
      title: "3. Sound",
      content: `
              <p>Sounds are an incredibly powerful and versatile medium for expressing intentions. This can be majorly divided into Linguistic sounds and Non-Linguistic sounds.</p>
              <p><strong>Linguistic sounds:</strong> When a speaker articulates a sound that has meaning. The listener can decode that meaning using cognitive abilities.</p>
              <ul>
                  <li><strong>Natural Languages:</strong> All natural languages are very effective in terms of expressing intention.</li>
                  <li><strong>Sign Languages:</strong> These have no sounds but contain all other components of communication.</li>
                  <li><strong>Programming Languages:</strong> A tool to express human intention to the machine. It has all features of natural language except 'sound'.</li>
              </ul>
              <p><strong>Non-Linguistic sounds:</strong></p>
              <ul>
                  <li><strong>Instrumental Music:</strong> Instruments produce sound, and it is possible to understand the intention of the instrument player.</li>
              </ul>
              <p><strong>Literature:</strong> An artistic use of language to convey a greater depth of emotion and subtlety, touching the heart and even the Ātman.</p>
              <p><strong>Saṅgītam:</strong> Used to express the utmost depths of feeling and intention. This unites instrumental music, vocal music, and dance, creating a multidimensional expression of bhāva.</p>
          `,
      color: "var(--accent-sound)",
    },
    "symbol-details": {
      title: "4. Symbol",
      content: `
              <p>Symbol is a profound and abstract medium for expressing 'भाव' (intention). Symbols are everywhere and are of two types: natural and artificial.</p>
              <p><strong>Artificial symbols</strong> are mostly human-created to specify some special meaning, such as traffic symbols.</p>
              <ul>
                  <li><strong>Numbers:</strong> Used to express count, volume, value, and size precisely, without ambiguity.</li>
                  <li><strong>Letters:</strong> Symbols for representing lingual sounds. We use the term 'script' to refer to the same.</li>
                  <li><strong>Shapes/symbols:</strong> Shapes like the 'swastika' explain intention effectively and are easy to remember.</li>
                  <li><strong>Pictures/Videos:</strong> A more attractive and efficient way to convey intentions.</li>
                  <li><strong>Combination of Many Symbols:</strong> Used to express deeper and complex intention precisely (e.g., in mathematics).</li>
              </ul>
          `,
      color: "var(--accent-red)",
    },
  };
  
  const mindmapBtns = document.querySelectorAll('.view-mindmap-btn');
  const mindmapOverlay = document.getElementById('mindmap-overlay');
  const mindmapPlaceholder = document.getElementById('placeholder');
  
  const mindmapCache = {}; // Use an object to cache the loaded HTML
  
  // The function now accepts a URL to fetch the correct file
  function showMindmap(url) {
      mindmapOverlay.style.display = 'flex';
      mindmapPlaceholder.innerHTML = '<p>Loading...</p>'; // Show a loading message
  
      // If we have already loaded this map, show it from the cache
      if (mindmapCache[url]) {
          mindmapPlaceholder.innerHTML = mindmapCache[url];
          return;
      }
  
      // Otherwise, fetch the new HTML file
      fetch(url)
          .then(response => {
              if (!response.ok) throw new Error(`Could not load ${url}`);
              return response.text();
          })
          .then(data => {
              mindmapCache[url] = data; // Save the loaded HTML to our cache
              mindmapPlaceholder.innerHTML = data;
          })
          .catch(error => {
              mindmapPlaceholder.innerHTML = `<p style="color: red;">Sorry, the mind map could not be loaded.</p>`;
              console.error('Error fetching mind map:', error);
          });
  }
  
  // Loop through buttons and pass the specific URL from the data attribute
  mindmapBtns.forEach(button => {
      button.addEventListener('click', (e) => {
          e.preventDefault();
          // Get the file path from the button's data-mindmap-src attribute
          const mindmapSrc = button.dataset.mindmapSrc; 
          if (mindmapSrc) {
              showMindmap(mindmapSrc);
          }
      });
  });
  
  // ========== CHANGED: UNIVERSAL CLOSE BUTTON HANDLER ==========
  // This single handler works for ALL close buttons in ANY modal/overlay
  document.addEventListener('click', (e) => {
      // Check if the clicked element is a close button
      if (e.target.classList.contains('close-button')) {
          // Find the closest overlay parent and hide it
          const overlay = e.target.closest('[id$="-overlay"]');
          if (overlay) {
              overlay.style.display = 'none';
          }
      }
  });
  
  // ========== CHANGED: UNIFIED OVERLAY CLICK HANDLER ==========
  // Close any overlay when clicking on its background
  document.addEventListener('click', (e) => {
      if (e.target.id === 'mindmap-overlay' || e.target.id === 'details-overlay') {
          e.target.style.display = 'none';
      }
  });
  
  const suggestionForm = document.querySelector('.suggestion-form');
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyAGz0AC7cNLUXRhuPpMautC7jBpSK8VLm30GUCmW5YtOsKJLfhlzvb4kXyxwvhd5GVxA/exec'
  
  suggestionForm.addEventListener('submit', e => {
      e.preventDefault(); // Stop the form from submitting the default way
      const submitButton = suggestionForm.querySelector('button');
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
  
      const formData = new FormData(suggestionForm);
  
      fetch(scriptURL, { method: 'POST', body: formData })
          .then(response => {
              if (response.ok) {
                  alert('Thank you! Your suggestion has been submitted successfully.');
                  suggestionForm.reset();
              } else {
                  throw new Error('Network response was not ok.');
              }
          })
          .catch(error => {
              console.error('Error!', error.message);
              alert('An error occurred. Please try again.');
          })
          .finally(() => {
              submitButton.disabled = false;
              submitButton.textContent = 'Submit Suggestion';
          });
  });
  
  
  
  // --- Modal Functionality ---
  document.querySelectorAll(".read-more").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.target.dataset.target;
      const detail = cardDetails[targetId];
  
      if (detail) {
        // Update modal content and color
        document.getElementById("detail-title").innerHTML = detail.title;
        document.getElementById("detail-text").innerHTML = detail.content;
        document.getElementById("detail-title").style.color = detail.color;
  
        // Show the modal
        document.getElementById("details-overlay").style.display = "flex";
      }
    });
  });
  
  // ========== REMOVED: Old separate close button handlers ==========
  // The universal handler above now handles all close buttons
  
  // --- Scroll Animation (Intersection Observer) ---
  const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: "0px",
    threshold: 0.1, // 10% of the element visible
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Apply the 'in-view' class to trigger CSS transitions
        entry.target.classList.add("in-view");
        // Check if it's the expression section to ensure staggered animation triggers
        if (entry.target.id === "expression") {
          entry.target.querySelectorAll(".category-card").forEach((card) => {
            // Force re-animation if needed, but the CSS handles the stagger via transition-delay
          });
        }
        observer.unobserve(entry.target); // Stop observing after it's animated once
      }
    });
  }, observerOptions);
  
  // Target all main sections for the scroll-in animation
  document
    .querySelectorAll(".content-section, .expression-section")
    .forEach((section) => {
      observer.observe(section);
    });
  
  fetch("templates/gist.html")
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("gist").innerHTML = data;
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
  
    });
});

  

