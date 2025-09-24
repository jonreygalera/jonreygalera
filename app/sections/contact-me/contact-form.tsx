'use client';
import TextField from "@/components/text-field";
import TextArea from "@/components/text-area";
import Button from "@/components/button";

export default function ContactForm(props: React.HTMLAttributes<HTMLFormElement>) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      const mailtoLink = `mailto:jonreygalera@gmail.com?subject=Message from ${data.name}&body=${encodeURIComponent(data.message as string)}%0A%0AFrom: ${data.name}%0AEmail: ${data.email}`;
      window.open(mailtoLink, '_blank');
      
      alert('Opening email client in new tab...');
      e.currentTarget.reset();
    } catch (error) {
      alert('Error preparing email. Please try again or contact me directly at jonreygalera@gmail.com');
    }
  };

  return (
    <form 
      className="flex flex-col w-full gap-1" 
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col w-full gap-2">
        <TextField 
          id="name"
          name="name"
          placeholder="Name"
          type="text"
          required
        />

        <TextField 
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          required
        />
      </div>
      <div>
        <TextArea
          id="message"
          name="message"
          rows={14}
          placeholder="Additional Details"
          required
        />
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="w-full md:!w-40">SUBMIT</Button>
      </div>
    </form>
  );
}
