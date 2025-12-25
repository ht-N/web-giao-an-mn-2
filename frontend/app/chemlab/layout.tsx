import Navbar from './_components/Navbar'
import Header from '@/components/header'

export default function ChemLabLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <Navbar />
            <main className="flex-grow">{children}</main>
        </div>
    )
}
