<?php 

	if (isset($_POST['name'])) {$name = $_POST['name'];}
	if (isset($_POST['email'])) {$email = $_POST['email'];}
	if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
	if (isset($_POST['text'])) {$text = $_POST['text'];}
	if (isset($_POST['btn'])) {$btn = $_POST['btn'];}


	//$name = htmlspecialchars($name);
	//$subject = htmlspecialchars($subject);
	// $email = htmlspecialchars($email);
	//$text_message = htmlspecialchars($text_message);

	$to  = 'oleynichenkos@gmail.com' . ', ';
  $to .= 'i@pilatestrener.kiev.ua';
	
	if ($btn == "message") {
		$subject = "Новое сообщение на сайте";
		$message = "Сообщение от ".$name."\n\n Контактный e-mail: ".$email."\n\n  ".$text."\n\n ";
	};

	if ($btn == "callback") {
		$message = "Просит перезвонить ".$name."\n\n Контактный телефон: ".$phone."\n\n  ";
		$subject = "Просьба перезвонить";
	};	

	if ($btn == "training") {
		$message = "Заказ на тренировку от ".$name."\n\n Контактный телефон: ".$phone."\n\n  ".$text."\n\n ";
		$subject = "Новый заказ на тренировку";
	};

	if ($btn == "programm") {
		$message = "Заказ на SlimProgramm от ".$name."\n\n Выслать на email: ".$email."\n\n  ";
		$subject = "Новый заказ на SlimProgramm";
	};
  
	$verify = mail($to, $subject, $message);
	
?>