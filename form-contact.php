<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // =========================
    // CLEAN INPUTS
    // =========================
    $name     = trim(strip_tags($_POST['user_name']));
    $phone    = trim(strip_tags($_POST['user_phone']));
    $email    = trim($_POST['user_email']);
    $category = trim(strip_tags($_POST['product_category']));
    $message  = trim(strip_tags($_POST['message']));

    // =========================
    // VALIDATE EMAIL
    // =========================
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        exit("Invalid Email Address");
    }

    // =========================
    // RECEIVER EMAIL
    // =========================
    $to = "nancy@uniqueflooring.in, crm@adsbazaar.in";

    // =========================
    // SUBJECT
    // =========================
    $subject = "New Inquiry From Website";

    // =========================
    // EMAIL BODY DESIGN
    // =========================
    $body = "
    <html>

    <body style='margin:0; padding:20px; background:#f4f4f4; font-family:Arial,sans-serif;'>

        <table width='100%' cellpadding='0' cellspacing='0'>
            <tr>
                <td align='center'>

                    <table width='auto' cellpadding='0' cellspacing='0' 
                    style='background:#ffffff; border-radius:10px; overflow:hidden;'>

                        <!-- HEADER -->
                        <tr>
                            <td style='background:#222; padding:20px; text-align:center;'>

                                <h2 style='margin:0; color:#ffffff;'>
                                    Wonder Woods
                                </h2>

                            </td>
                        </tr>

                        <!-- CONTENT -->
                        <tr>
                            <td style='padding:30px;'>

                                <h3 style='margin-top:0; color:#222;'>
                                    New Contact Form Submission
                                </h3>

                                <table width='100%' cellpadding='12' cellspacing='0' 
                                style='border-collapse:collapse;'>

                                    <tr>
                                        <td style='border:1px solid #ddd; background:#f9f9f9; width:180px;'>
                                            <strong>Name</strong>
                                        </td>

                                        <td style='border:1px solid #ddd;'>
                                            $name
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style='border:1px solid #ddd; background:#f9f9f9;'>
                                            <strong>Phone</strong>
                                        </td>

                                        <td style='border:1px solid #ddd;'>
                                            $phone
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style='border:1px solid #ddd; background:#f9f9f9;'>
                                            <strong>Email</strong>
                                        </td>

                                        <td style='border:1px solid #ddd;'>
                                            $email
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style='border:1px solid #ddd; background:#f9f9f9;'>
                                            <strong>Category</strong>
                                        </td>

                                        <td style='border:1px solid #ddd;'>
                                            $category
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style='border:1px solid #ddd; background:#f9f9f9;'>
                                            <strong>Message</strong>
                                        </td>

                                        <td style='border:1px solid #ddd;'>
                                            $message
                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td style='padding:18px; text-align:center; background:#fafafa; color:#777; font-size:13px;'>

                                This email was sent from your website contact form.

                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    ";

    // =========================
    // CLEAN HEADERS
    // =========================
    $headers = [];

    $headers[] = "From: Wonder Woods <noreply@wonderwoods.in>";
    $headers[] = "Reply-To: $email";

    // HTML MAIL
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/html; charset=UTF-8";

    // Better Deliverability
    $headers[] = "X-Mailer: PHP/" . phpversion();

    // Unique Message ID
    $headers[] = "Message-ID: <" . time() . rand(1000,9999) . "@wonderwoods.in>";

    // =========================
    // SEND MAIL
    // =========================
    $send = mail(
        $to,
        $subject,
        $body,
        implode("\r\n", $headers)
    );

    // =========================
    // RESPONSE
    // =========================
    if ($send) {

        echo "
        <script>
            alert('Message Sent Successfully');
            window.location.href='index.html';
        </script>
        ";

    } else {

        echo "
        <script>
            alert('Message Sending Failed');
            window.history.back();
        </script>
        ";
    }
}
?>