javascript:(function() {

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.gif,.jpg,.png'; 


    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert('No file selected.');
            return;
        }


        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (!validImageTypes.includes(file.type)) {
            alert('Please select a valid image file (GIF, JPG, PNG).');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const arrayBuffer = event.target.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                const blob = new Blob([uint8Array], { type: file.type });
                const url = URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.href = url;
                link.download = "background." + file.type.split('/')[1]; 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                

                URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error reading file:', error);
                alert('An error occurred while processing the file.');
            }
        };

        reader.readAsArrayBuffer(file);
    };

    input.click();
})();
