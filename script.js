let quedaCount = 0;
let ativoCount = 0;
const checkInterval = 60000; // Intervalo de verificação em milissegundos (ex. 5000ms = 5s)

$(document).ready(function() {
    function checkEndpoint() {
        $.ajax({
            url: 'https://auto-parcerias.linx.com.br/LinxDMSAPI.dll/flychat/auth',
            method: 'GET',
            success: function(response) {
                ativoCount++;
                $('#ativoCounter').text(`Ativos: ${ativoCount}`);
                logEvent('ativoLogs', ativoCount, 'Ativo');
            },
            error: function(xhr, status, error) {
                if (xhr.status !== 200) {
                    quedaCount++;
                    $('#quedaCounter').text(`Quedas: ${quedaCount}`);
                    logEvent('quedaLogs', quedaCount, 'Queda');
                    $('#errorLog').text(`Erro: ${xhr.status} - ${xhr.statusText}`);
                }
            }
        });
    }

    function logEvent(logId, count, type) {
        const now = new Date();
        const timestamp = now.toLocaleString('pt-BR', { hour12: false });
        const logEntry = `<div class="log-entry"><span>${count}</span><span>${timestamp}</span></div>`;
        $(`#${logId}`).append(logEntry);

        // Simulate an API request to log the event
        $.ajax({
            url: 'https://auto-parcerias.linx.com.br/LinxDMSAPI.dll/flychat/auth',
            method: 'POST',
            data: {
                type: type,
                timestamp: timestamp,
                count: count
            },
            success: function(response) {
                console.log('Log saved:', response);
            },
            error: function(xhr, status, error) {
                $('#errorLog').text(`Erro ao salvar log: ${xhr.status} - ${xhr.statusText}`);
            }
        });
    }

    // Chama a função checkEndpoint em intervalos regulares
    setInterval(checkEndpoint, checkInterval);
});
