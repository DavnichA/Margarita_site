<?php

$recepient = "d.a.lonerwolf@gmail.com";
$sitename = "Margarita Romanenko";

$name = trim($_POST["name"]);
$address = trim($_POST["address"]);
$subject = trim($_POST["subject"]);
$text = trim($_POST["text"]);
$message = "Имя: $name \nEmail: $address \nТема: $subject \nТекст: $text";

$pagetitle = "Новое сообщене с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");