export function base64ImageToFile(imageB64) {
    const byteCharacters = atob(imageB64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const arrayBuffer = byteArray.buffer;
    
    // Crear Blob a partir de ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    
    // Crear objeto File a partir de Blob
    const file = new File([blob], 'screenshot.jpg', { type: 'image/jpeg' });

    return file;
}