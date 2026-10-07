<?php

// ======================================================
// SJAKKO GLOBAL WEBSITE CONTACT FORM
// ======================================================

// Only accept form submissions
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html");
    exit;
}


// ------------------------------------------------------
// EMAIL SETTINGS
// ------------------------------------------------------

$recipient = "info@sjakkoglobal.com.ng";


// ------------------------------------------------------
// COLLECT FORM DATA
// ------------------------------------------------------

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$message = trim($_POST["message"] ?? "");
$website = trim($_POST["website"] ?? "");


// ------------------------------------------------------
// BASIC SPAM PROTECTION
// ------------------------------------------------------

// Real visitors will never see or fill this field.

if (!empty($website)) {
    header("Location: index.html?status=success#contact");
    exit;
}


// ------------------------------------------------------
// VALIDATE REQUIRED FIELDS
// ------------------------------------------------------

if (
    empty($name) ||
    empty($email) ||
    empty($message)
) {
    header("Location: index.html?status=invalid#contact");
    exit;
}


// Validate email

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: index.html?status=invalid#contact");
    exit;
}


// ------------------------------------------------------
// LIMIT INPUT LENGTH
// ------------------------------------------------------

$name = substr($name, 0, 100);
$email = substr($email, 0, 150);
$phone = substr($phone, 0, 40);
$message = substr($message, 0, 5000);


// ------------------------------------------------------
// PREVENT EMAIL HEADER INJECTION
// ------------------------------------------------------

$name = str_replace(
    array("\r", "\n"),
    "",
    $name
);

$email = str_replace(
    array("\r", "\n"),
    "",
    $email
);

$phone = str_replace(
    array("\r", "\n"),
    " ",
    $phone
);


// ------------------------------------------------------
// EMAIL SUBJECT
// ------------------------------------------------------

$subject = "New Website Enquiry - SJAKKO Global";


// ------------------------------------------------------
// BUILD EMAIL
// ------------------------------------------------------

$emailBody =
"NEW WEBSITE ENQUIRY

A new enquiry has been submitted through the
SJAKKO Global website.

--------------------------------------------

Name:
$name

Email:
$email

Phone:
$phone

Message:
$message

--------------------------------------------

Website:
sjakkoglobal.com.ng

This message was submitted through the
SJAKKO Global website contact form.
";


// ------------------------------------------------------
// EMAIL HEADERS
// ------------------------------------------------------

// Use the company's own domain as the From address.
// The visitor's address is used as Reply-To.

$headers = "From: SJAKKO Global Website <info@sjakkoglobal.com.ng>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();


// ------------------------------------------------------
// SEND
// ------------------------------------------------------

$sent = mail(
    $recipient,
    $subject,
    $emailBody,
    $headers
);


// ------------------------------------------------------
// RESULT
// ------------------------------------------------------

if ($sent) {

    header(
        "Location: index.html?status=success#contact"
    );

} else {

    header(
        "Location: index.html?status=error#contact"
    );

}

exit;

?>