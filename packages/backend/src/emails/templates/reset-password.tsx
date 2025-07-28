import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface Props {
  projectName: string;
  baseUrl: string;
  resetToken: string;
}

export const ResetPassword = ({ projectName, baseUrl, resetToken }: Props) => {
  baseUrl = baseUrl.replace(/\/$/, '');

  return (
    <Html>
      <Head />
      <Preview>Сброс пароля на сайте {projectName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <div style={{ textAlign: 'center' }}>
            <Link
              href={baseUrl}
              target="_blank"
              style={{ display: 'inline-block', margin: '1rem auto 0' }}
            >
              <Img
                src={`${baseUrl}/favicons/icon.svg`}
                width="64"
                height="64"
                alt="Logo"
              />
            </Link>
          </div>
          <Heading style={h1}>Сброс пароля</Heading>

          <Text style={text}>
            Вы получили это письмо, потому что вы пытались сбросить пароль на
            сайте.
            <br />
            Если вы не пытались сбросить пароль, можете смело игнорировать это
            письмо.
          </Text>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link
              href={`${baseUrl}/change-password?resetToken=${resetToken}`}
              target="_blank"
              style={button}
            >
              Сбросить пароль
            </Link>
          </div>
        </Container>
      </Body>
    </Html>
  );
};

ResetPassword.PreviewProps = {
  baseUrl: 'https://aurora-launcher.ru/',
  projectName: 'Example',
  resetToken: '3b6d99cce4dfc6f1a9e83457ab9aa6c4',
} as Props;

export default ResetPassword;

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: '600',
};

const text = {
  color: '#ababab',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const button = {
  backgroundColor: '#4f7fff',
  borderRadius: '10px',
  color: '#fff',
  fontWeight: '500',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  padding: '10px 20px',
  display: 'inline-block',
};
