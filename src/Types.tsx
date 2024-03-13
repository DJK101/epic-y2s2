interface User {
  name: string;
  email: string;
  password: string;
  dob: string;
  admin: boolean;
}

interface ToastDetails {
  title: string;
  content: string;
  style:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "light"
    | "";
}
