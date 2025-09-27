    const dropArea = document.getElementById('dropArea');
        const fileInput = document.getElementById('fileInput');
        const previewContainer = document.getElementById('previewContainer');
        const previewArea = document.getElementById('previewArea');
        const fileInfo = document.getElementById('fileInfo');
        const uploadAllBtn = document.getElementById('uploadAllBtn');
        const clearAllBtn = document.getElementById('clearAllBtn');
        const toast = document.getElementById('toast');
        
        let files = [];
        
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => dropArea.classList.add('dragover'), false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => dropArea.classList.remove('dragover'), false);
        });
        
        // Handle dropped files
        dropArea.addEventListener('drop', handleDrop, false);
        
        // Handle file input change
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });
        
        // Browse button click
        dropArea.querySelector('.browse-btn').addEventListener('click', function() {
            fileInput.click();
        });
        
        // Upload all button
        uploadAllBtn.addEventListener('click', uploadAllFiles);
        
        // Clear all button
        clearAllBtn.addEventListener('click', clearAllFiles);
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            handleFiles(dt.files);
        }
        
        function handleFiles(newFiles) {
            const imageFiles = Array.from(newFiles).filter(file => file.type.startsWith('image/'));
            
            if (imageFiles.length === 0) {
                showToast('Please select valid image files only', true);
                return;
            }
            
            const validFiles = imageFiles.filter(file => {
                if (file.size > 5 * 1024 * 1024) {
                    showToast(`File ${file.name} is too large (max 5MB)`, true);
                    return false;
                }
                return true;
            });
            
            if (validFiles.length === 0) return;
            
            files = [...files, ...validFiles];
            updatePreview();
            updateFileInfo();
            
            if (files.length > 0) {
                previewContainer.style.display = 'block';
            }
            
            showToast(`${validFiles.length} file(s) added successfully`);
        }
        
        function updatePreview() {
            previewArea.innerHTML = '';
            
            files.forEach((file, index) => {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="${file.name}">
                        <button class="remove-btn" data-index="${index}">×</button>
                    `;
                    
                    previewArea.appendChild(previewItem);
                    
                    previewItem.querySelector('.remove-btn').addEventListener('click', function() {
                        const removeIndex = parseInt(this.getAttribute('data-index'));
                        removeFile(removeIndex);
                    });
                };
                
                reader.readAsDataURL(file);
            });
        }
        
        function updateFileInfo() {
            if (files.length === 0) {
                fileInfo.textContent = 'No files selected';
                return;
            }
            
            const totalSize = files.reduce((total, file) => total + file.size, 0);
            const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
            
            fileInfo.textContent = `${files.length} file(s) | ${sizeInMB} MB`;
        }
        
        function removeFile(index) {
            files.splice(index, 1);
            updatePreview();
            updateFileInfo();
            
            if (files.length === 0) {
                previewContainer.style.display = 'none';
            }
        }
        
        function clearAllFiles() {
            if (files.length === 0) return;
            
            files = [];
            previewContainer.style.display = 'none';
            updatePreview();
            updateFileInfo();
            showToast('All files cleared');
        }
        
        function uploadAllFiles() {
            if (files.length === 0) {
                showToast('No files to upload', true);
                return;
            }
            
            showToast(`Uploading ${files.length} file(s)...`);
            
            setTimeout(() => {
                showToast('Files uploaded successfully!');
            }, 2000);
        }
        
        function showToast(message, isError = false) {
            toast.textContent = message;
            toast.className = 'toast';
            
            if (isError) {
                toast.classList.add('error');
            }
            
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }