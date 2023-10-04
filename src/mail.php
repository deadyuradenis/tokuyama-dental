<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';
//

$mail = new PHPMailer(true);

try {
	$mail->CharSet = 'UTF-8';
    $mail->isSMTP();    
    $mail->Mailer = 'smtp';
    $mail->Host = 'ssl://smtp.yandex.ru';
    $mail->SMTPAuth = true;
	
	$mail->SMTPDebug = 0;
    $mail->SMTPSecure = 'tls';
    $mail->Port = 465;

    $mail->Username = 'e-16671307@yandex.ru';
    $mail->Password = 'AVuTMLI9';

    $mail->setFrom('e-16671307@yandex.ru');
    
    $mail->addAddress('e-16671307@yandex.ru');
    $mail->addAddress('deniswispo@gmail.com');
	$mail->Subject = 'Заявка на консультацию';
    //
    $mail->IsHTML(true);

    $thpage = "thanks.html";

    if (!empty($_POST['form'])){
        $form = $_POST["form"] ?? "1";

        switch ($form) {
            case "1":
		$title = "Обратный звонок: Заявка с сайта";
            break;

            case "2":
		$title = "Квиз: Заявка с сайта";
            break;

            case "3":
		$title = "Быстрый заказ: Заявка с сайта";
            break;

            case "4":
		$title = "Коммерческое предложение: Заявка с сайта";
            break;

            default:
		$title = "Обратный звонок: Заявка с сайта";
            break;
        }
	$body = "<h1>".$title."</h1>";
        
    }
	$comment = "";
	if(trim(!empty($_POST['question_1']))){
		$body.='<p><strong>Планируемый материал для переработки:<br></strong> '.$_POST['question_1'].'</p>';
		$comment .= "Планируемый материал для переработки: ".$_POST['question_1']."\n";
	}

    if(trim(!empty($_POST['question_2']))){
		$body.='<p><strong>Наличие металла в древесине:<br></strong> '.$_POST['question_2'].'</p>';
		$comment .= "Наличие металла в древесине: ".$_POST['question_2']."\n";
	}

    $qs3  = stripslashes($_POST['question_3']);
    if(trim(!empty($_POST['question_3']))){
        foreach($_POST['question_3'] as $check) { 
            $qs3 .= $check.'<br>'; 
        }
		$body.='<p><strong>Вид щепы после измельчения:<br></strong> '.$qs3.'</p>';
		$comment .= "Вид щепы после измельчения: ".(is_array($_POST["question_2"])) ? implode(", ", $_POST["question_2"]) : $_POST["question_2"]."\n";
	}

    if(trim(!empty($_POST['question_4']))){
		$body.='<p><strong>Диаметр древесины:<br></strong> '.$_POST['question_4'].'</p>';
		$comment .= "Диаметр древесины: ".$_POST['question_4']."\n";
	}

    if(trim(!empty($_POST['question_5']))){
		$body.='<p><strong>Тип установки щепореза:<br></strong> '.$_POST['question_5'].'</p>';
		$comment .= "Тип установки щепореза: ".$_POST['question_5']."\n";
	}

    if(trim(!empty($_POST['question_6']))){
		$body.='<p><strong>Город:<br></strong> '.$_POST['question_6'].'</p>';
		$comment .= "Город: ".$_POST['question_6']."\n";
	}

    
    if(trim(!empty($_POST['gift']))){
		$body.='<p><strong>Подарок:<br></strong> '.$_POST['gift'].'</p>';
		$comment .= "Подарок: ".$_POST['gift']."\n";
	}
    if(trim(!empty($_POST['messenger']))){
		$body.='<p><strong>Способ связи:<br></strong> '.$_POST['messenger'].'</p>';
		$comment .= "Способ связи: ".$_POST['messenger']."\n";
	}
    if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Телефон:<br></strong> '.$_POST['phone'].'</p>';
	}

	$mail->Body = $body;

	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {

		require_once $_SERVER["DOCUMENT_ROOT"] . "/amo/amo.php";
		addLead($title, array("phone" => $_POST["phone"], "comment" => $comment));

		$message = 'Данные отправлены!';
        require ($_SERVER["DOCUMENT_ROOT"]."/".$thpage);
	}
    
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>


