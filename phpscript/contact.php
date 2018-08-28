<?php
// EDIT A LINE BELOW AS REQUIRED

$email_to = "sachin@tricodia.com";
// $email_to = "raysatvisionkovalam@gmail.com";

// CUSTOME YOUR EMAIL SUBJECT

$email_subject = "Contact From Raysatvision Website";

// COMPONENT FUNCTION
/**
 * @param $data
 * @return string
 */
function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

/**
 * @param $string
 * @return mixed
 */
function clean_string($string) {
	$bad = array("content-type", "bcc:", "to:", "cc:", "href");
	return str_replace($bad, "", $string);
}

// GET DATA FROM AJAX

$contact_name    = test_input($_POST['name']);
$contact_phone   = test_input($_POST['phone']);
$contact_email   = test_input($_POST['email']);
$contact_message = test_input($_POST['message']);

$email_message = "From: ".clean_string($contact_name)."\n";

$email_message .= "Phone: ".clean_string($contact_phone)."\n";

$email_message .= "Email: ".clean_string($contact_email)."\n";

$email_message .= "Message: ".clean_string($contact_message)."\n";

$headers = 'From: '.$contact_email."\r\n".

	'Reply-To: '.$contact_email."\r\n".

	'X-Mailer: PHP/'.phpversion();

@mail($email_to, $email_subject, $email_message, $headers);