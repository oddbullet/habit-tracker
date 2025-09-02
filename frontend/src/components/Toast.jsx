import { Toast } from "radix-ui";

export default function ToastComponent({ open, setOpen, title, description }) {
  return (
    <Toast.Provider swipeDirection="up">
      <Toast.Root
        className="ToastRoot"
        open={open}
        onOpenChange={setOpen}
        duration={2000}
      >
        <Toast.Title className="ToastTitle">{title}</Toast.Title>
        <Toast.Description className="ToastDescription">
          {description}
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
}
