javascript:(function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.gif,.jpg,.png';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            const blob = new Blob([uint8Array], { type: file.type });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "background."+file.type;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log('File ready for download:', file.name);
            console.log('Overwrite background in explorer:');
            const profilePath = Services.dirsvc.get("ProfD", Ci.nsIFile).path;
            console.log(profilePath + "/chrome");
        };
        reader.readAsArrayBuffer(file);
    };
    input.click();
})();