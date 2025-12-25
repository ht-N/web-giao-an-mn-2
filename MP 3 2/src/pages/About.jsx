import {
    CheckCircle2,
    Code,
    Globe,
    GraduationCap,
    Heart,
    Lightbulb,
    Rocket,
    Sparkles,
    Target,
    Users,
} from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: <Target className="w-12 h-12 text-white" />,
            title: 'Sứ Mệnh',
            description: 'Làm cho việc học hóa học trở nên dễ dàng và thú vị hơn thông qua công nghệ mô phỏng 3D tiên tiến.',
            gradient: 'from-blue-600 to-cyan-600'
        },
        {
            icon: <Users className="w-12 h-12 text-white" />,
            title: 'Đội Ngũ',
            description: 'Nhóm các nhà giáo dục, nhà khoa học và lập trình viên đam mê đổi mới giáo dục hóa học.',
            gradient: 'from-purple-600 to-pink-600'
        },
        {
            icon: <Lightbulb className="w-12 h-12 text-white" />,
            title: 'Tầm Nhìn',
            description: 'Tạo ra một thế giới nơi mọi học sinh đều có thể tiếp cận giáo dục hóa học chất lượng cao.',
            gradient: 'from-orange-600 to-red-600'
        }
    ]

    const coreValues = [
        {
            icon: <Heart className="w-8 h-8 text-red-600" />,
            title: 'Đam Mê Giáo Dục',
            description: 'Chúng tôi tin rằng giáo dục là chìa khóa để thay đổi thế giới'
        },
        {
            icon: <Rocket className="w-8 h-8 text-blue-600" />,
            title: 'Đổi Mới Sáng Tạo',
            description: 'Luôn tìm kiếm những cách tiếp cận mới và hiệu quả hơn'
        },
        {
            icon: <Globe className="w-8 h-8 text-green-600" />,
            title: 'Tiếp Cận Toàn Cầu',
            description: 'Mang giáo dục chất lượng đến với mọi người, mọi nơi'
        },
        {
            icon: <Sparkles className="w-8 h-8 text-purple-600" />,
            title: 'Chất Lượng Cao',
            description: 'Cam kết cung cấp trải nghiệm học tập tốt nhất'
        }
    ]





    const team = [
        {
            role: 'Giáo Dục',
            icon: <GraduationCap className="w-8 h-8" />,
            description: 'Các chuyên gia giáo dục hóa học với nhiều năm kinh nghiệm',
            color: 'text-blue-600 bg-blue-50'
        },
        {
            role: 'Công Nghệ',
            icon: <Code className="w-8 h-8" />,
            description: 'Đội ngũ lập trình viên tài năng chuyên về 3D và web',
            color: 'text-purple-600 bg-purple-50'
        },
        {
            role: 'Khoa Học',
            icon: <Lightbulb className="w-8 h-8" />,
            description: 'Các nhà khoa học đảm bảo tính chính xác của nội dung',
            color: 'text-green-600 bg-green-50'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Header */}
            <section className="relative bg-gradient-to-br from-blue-600 via-primary-600 to-purple-700 py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-sm font-semibold">Về Chúng Tôi</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                        Về ChemLab
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                        Cách mạng hóa việc học hóa học thông qua mô phỏng thí nghiệm tương tác 3D.
                        Chúng tôi tin rằng học hóa học nên là một trải nghiệm thú vị và dễ tiếp cận.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            Giá Trị Cốt Lõi
                        </h2>
                        <p className="text-xl text-gray-600">
                            Những nguyên tắc định hướng mọi hoạt động của chúng tôi
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                            >
                                <div className={`bg-gradient-to-br ${value.gradient} p-8 text-center`}>
                                    <div className="flex justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                                        <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                                            {value.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">{value.title}</h3>
                                </div>
                                <div className="p-8">
                                    <p className="text-gray-600 text-center leading-relaxed text-lg">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreValues.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                            >
                                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform">
                                    {value.icon}
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2 text-center">
                                    {value.title}
                                </h4>
                                <p className="text-gray-600 text-center text-sm">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            Câu Chuyện Của Chúng Tôi
                        </h2>
                        <p className="text-xl text-gray-600">
                            Hành trình từ ý tưởng đến hiện thực
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0">
                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Vấn Đề</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        ChemLab ra đời từ nhận thức rằng: học hóa học không nên chỉ là lý thuyết trên sách vở.
                                        Với nhiều học sinh gặp khó khăn trong việc hiểu các phản ứng hóa học phức tạp, chúng tôi
                                        thấy cơ hội sử dụng công nghệ mô phỏng để làm cho hóa học trở nên sinh động hơn.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0">
                                    <Rocket className="w-8 h-8 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Giải Pháp</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Nền tảng của chúng tôi cho phép học sinh thực hiện các thí nghiệm ảo một cách an toàn,
                                        quan sát phản ứng hóa học theo thời gian thực và hiểu sâu hơn về các khái niệm hóa học.
                                        Chúng tôi kết hợp kiến thức hóa học truyền thống với công nghệ 3D hiện đại.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-10 rounded-2xl shadow-xl text-white text-center">
                        <Globe className="w-16 h-16 mx-auto mb-6" />
                        <h3 className="text-3xl font-bold mb-4">Tác Động Hiện Tại</h3>
                        <p className="text-xl text-blue-50 leading-relaxed max-w-3xl mx-auto">
                            Ngày nay, chúng tôi tự hào hỗ trợ hàng nghìn học sinh và giáo viên khám phá thế giới
                            hóa học một cách thú vị và hiệu quả hơn mỗi ngày. Mỗi thí nghiệm được thực hiện là một bước
                            tiến trong việc làm cho giáo dục khoa học trở nên dễ tiếp cận hơn.
                        </p>
                    </div>
                </div>
            </section>





            {/* Team Section */}
            <section className="bg-gradient-to-b from-slate-50 to-white py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            Đội Ngũ Của Chúng Tôi
                        </h2>
                        <p className="text-xl text-gray-600">
                            Những người đứng sau ChemLab
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                            >
                                <div className={`inline-flex p-5 rounded-2xl mb-6 ${member.color}`}>
                                    {member.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{member.role}</h3>
                                <p className="text-gray-600 leading-relaxed">{member.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center bg-gradient-to-r from-primary-600 to-purple-600 p-12 rounded-2xl shadow-xl">
                        <Users className="w-16 h-16 text-white mx-auto mb-6" />
                        <h3 className="text-3xl font-bold text-white mb-4">
                            Tham Gia Cùng Chúng Tôi
                        </h3>
                        <p className="text-xl text-blue-50 mb-6 max-w-2xl mx-auto">
                            Chúng tôi luôn tìm kiếm những người tài năng và đam mê giáo dục để cùng xây dựng tương lai của việc học hóa học.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['Giáo viên', 'Lập trình viên', 'Nhà khoa học', 'Designer'].map((role, index) => (
                                <span key={index} className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30">
                                    {role}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
