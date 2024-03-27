$(document).ready(function() {
    // Merchant bilgileri
    var merchantConfig = {
        id: 'xxxxx',
        key: 'xxxxx',
        salt: 'xxxxxx'
    };

    // Ödeme seçenekleri
    var paymentConfig = {
        okUrl: "<?php echo $successUrl; ?>",
        failUrl: "<?php echo $errorUrl; ?>",
        testMode: "0",
        non3d: "0",
        lang: "tr",
        non3dTestFailed: "0",
        type: "card",
        currency: "TL",
        installmentCount: "0"
    };

    // Kullanıcı bilgileri
    var userInfo = {
        basket: '<?php echo $user_basket; ?>',
        oid: "<?php echo $merchant_oid; ?>",
        ip: "<?php echo $user_ip; ?>",
        email: "<?php echo $email; ?>"
    };

    function calculateToken() {
        var paymentAmount = $('#payment_amount').val();
        var hashStr = merchantConfig.id + userInfo.ip + userInfo.oid + userInfo.email + paymentAmount + paymentConfig.type + paymentConfig.installmentCount + paymentConfig.currency + paymentConfig.testMode + paymentConfig.non3d + merchantConfig.salt;
        var base64Encode = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(hashStr, merchantConfig.key));
        var token = base64Encode;

        $('#paytr_token').val(token);
        $('#payment_amount').val(paymentAmount);
    }

    // Ödeme miktarı değiştiğinde veya sayfa yüklendiğinde token hesapla
    $('#payment_amount').on('input', calculateToken);
    $(window).on('load', calculateToken);
});



//Uğurcan Yaş #Altf4 Yazılım 27.03.2024
