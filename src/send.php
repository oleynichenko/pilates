<?php 

	if (isset($_POST['name'])) {$name = $_POST['name'];}
	if (isset($_POST['email'])) {$email = $_POST['email'];}
	if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
	if (isset($_POST['text'])) {$text = $_POST['text'];}
	if (isset($_POST['btn'])) {$btn = $_POST['btn'];}


	$name = stripslashes($name);
	$email = stripslashes($email);
	$text = stripslashes($text);
	$subject = stripslashes($subject);

	if ($btn == 'message') {
		$subject = "Новое сообщение на сайте";
		$message = "Имя: ".$name."\n\n Мой контактный e-mail: ".$email."\n\n  ".$text."\n\n ";
	};

	if ($btn == 'callback') {
		$subject = "Просьба перезвонить";
		$message = "Имя: ".$name."\n\n Мой контактный телефон: ".$phone."\n\n  ";
	};


	//$name = htmlspecialchars($name);
	//$subject = htmlspecialchars($subject);
	// $email = htmlspecialchars($email);
	//$text_message = htmlspecialchars($text_message);

	$address = "oleynichenkos@gmail.com";
  
	// $message = "Имя: ".$name."\n\n Мой контактный e-mail: ".$email."\n\n  ".$text."\n\n ";

	$verify = mail($address, 'Новое сообщение', $message);

?>