import { FAQHeader } from "./_components/FAQHeader";
import { FAQList } from "./_components/FAQList";

function FAQPage() {
  return (
    <div className="relative min-h-screen w-full overflow-auto bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

      <div className="relative pt-24 pb-16 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <FAQHeader />
          <FAQList />
        </div>
      </div>
    </div>
  );
}

export default FAQPage;
