import {
    Atom,
    Award,
    Beaker,
    BookOpen,
    CheckCircle2,
    FlaskConical,
    Microscope,
    Shield,
    Sparkles,
    TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const features = [
        {
            icon: <FlaskConical className="w-12 h-12 text-primary-600" />,
            title: 'Thí Nghiệm Ảo',
            description: 'Thực hiện các thí nghiệm hóa học an toàn trong môi trường mô phỏng 3D chân thực.',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: <Atom className="w-12 h-12 text-primary-600" />,
            title: 'Phản Ứng Hóa Học',
            description: 'Khám phá hàng trăm phản ứng hóa học với hiệu ứng trực quan và giải thích chi tiết.',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: <Beaker className="w-12 h-12 text-primary-600" />,
            title: 'Dụng Cụ Đa Dạng',
            description: 'Sử dụng các dụng cụ phòng thí nghiệm chuyên nghiệp như ống nghiệm, bếp đun, cân điện tử.',
            gradient: 'from-orange-500 to-red-500'
        },
        {
            icon: <Microscope className="w-12 h-12 text-primary-600" />,
            title: 'Học Tập Tương Tác',
            description: 'Học hóa học qua thực hành với bài tập và hướng dẫn từng bước chi tiết.',
            gradient: 'from-green-500 to-emerald-500'
        }
    ]

    const benefits = [
        {
            icon: <Shield className="w-8 h-8 text-blue-600" />,
            title: 'An Toàn Tuyệt Đối',
            description: 'Không lo ngại về hóa chất độc hại hay tai nạn phòng thí nghiệm'
        },
        {
            icon: <Sparkles className="w-8 h-8 text-purple-600" />,
            title: 'Trực Quan 3D',
            description: 'Quan sát phản ứng ở cấp độ phân tử với đồ họa 3D sống động'
        },
        {
            icon: <BookOpen className="w-8 h-8 text-green-600" />,
            title: 'Học Mọi Lúc',
            description: 'Truy cập phòng thí nghiệm ảo 24/7 từ bất kỳ đâu'
        },
        {
            icon: <Award className="w-8 h-8 text-orange-600" />,
            title: 'Chứng Nhận',
            description: 'Nhận chứng chỉ sau khi hoàn thành các thí nghiệm'
        }
    ]

    const stats = [
        { number: '100+', label: 'Thí Nghiệm', icon: <FlaskConical className="w-6 h-6" /> },
        { number: '50+', label: 'Phản Ứng', icon: <Atom className="w-6 h-6" /> },
        { number: '1000+', label: 'Học Viên', icon: <TrendingUp className="w-6 h-6" /> },
        { number: '4.9/5', label: 'Đánh Giá', icon: <Award className="w-6 h-6" /> }
    ]

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-primary-600 to-purple-700 py-24 px-4 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6 animate-bounce">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-sm font-semibold">Nền tảng học hóa học hiện đại nhất</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                        Khám Phá Thế Giới
                        <br />
                        <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                            Hóa Học 3D
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-50 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Trải nghiệm các thí nghiệm hóa học an toàn và thú vị trong môi trường mô phỏng
                        3D chân thực. Học hóa học qua thực hành một cách hiệu quả nhất!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            to="/explore"
                            className="group inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-10 py-5 rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                        >
                            <FlaskConical className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                            Bắt Đầu Thí Nghiệm
                        </Link>
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-10 py-5 rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                        >
                            Tìm Hiểu Thêm
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-12 px-4 border-b">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
                                <div className="flex justify-center mb-2 text-primary-600 group-hover:text-primary-700">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-bold text-gray-900 mb-1">{stat.number}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gradient-to-b from-slate-50 to-white py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            Tại Sao Chọn ChemLab?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Công nghệ tiên tiến kết hợp với phương pháp giảng dạy hiệu quả
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                            >
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className="flex justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                        <div className="p-4 bg-primary-50 rounded-2xl group-hover:bg-primary-100 transition-colors">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-primary-600 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-center leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            Lợi Ích Vượt Trội
                        </h2>
                        <p className="text-xl text-gray-600">
                            Những điều làm nên sự khác biệt của ChemLab
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex gap-6 bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-primary-200"
                            >
                                <div className="flex-shrink-0">
                                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                        {benefit.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-white py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            Cách Thức Hoạt Động
                        </h2>
                        <p className="text-xl text-gray-600">
                            Chỉ với 3 bước đơn giản
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                step: '01',
                                title: 'Chọn Thí Nghiệm',
                                description: 'Duyệt qua thư viện phong phú các thí nghiệm hóa học được phân loại theo chủ đề và độ khó',
                                color: 'from-blue-500 to-cyan-500'
                            },
                            {
                                step: '02',
                                title: 'Thực Hành Mô Phỏng',
                                description: 'Tương tác với dụng cụ và hóa chất trong môi trường 3D chân thực, quan sát phản ứng theo thời gian thực',
                                color: 'from-purple-500 to-pink-500'
                            },
                            {
                                step: '03',
                                title: 'Học & Đánh Giá',
                                description: 'Xem kết quả, hiểu nguyên lý và hoàn thành bài kiểm tra để củng cố kiến thức',
                                color: 'from-orange-500 to-red-500'
                            }
                        ].map((item, index) => (
                            <div key={index} className="relative group">
                                <div className="text-center">
                                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${item.color} text-white text-3xl font-bold mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {item.step}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -z-10"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Sẵn Sàng Khám Phá Hóa Học?
                    </h2>
                    <p className="text-xl md:text-2xl text-blue-50 mb-10 max-w-3xl mx-auto">
                        Tham gia cùng hàng nghìn học sinh và giáo viên đang sử dụng ChemLab để học hóa học hiệu quả hơn mỗi ngày.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Link
                            to="/explore"
                            className="group inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-10 py-5 rounded-xl shadow-2xl hover:shadow-white/30 transition-all duration-300 transform hover:scale-105"
                        >
                            <FlaskConical className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                            Khám Phá Ngay
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-white/90">
                        {[
                            'Miễn phí dùng thử',
                            'Không cần cài đặt',
                            'Hỗ trợ 24/7'
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-300" />
                                <span className="font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
