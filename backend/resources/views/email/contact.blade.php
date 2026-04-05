<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Email</title>
</head>
<body>
    <h2>You have received a new contact message.</h2>
    <p><strong>Full Name:</strong> {{ $mailData['fullname'] }}</p>
    <p><strong>Email:</strong> {{ $mailData['email'] }}</p>
    <p><strong>Address:</strong> {{ $mailData['address'] }}</p>
    <p><strong>Subject:</strong> {{ $mailData['subject'] }}</p>
    <p><strong>Phone:</strong> {{ $mailData['phone'] }}</p>
    <p><strong>Message:</strong></p>
    <p>{{ $mailData['message'] }}</p>

    <p>Best regards,<br>{{ $mailData['fullname'] }}</p>
</body>
</html>