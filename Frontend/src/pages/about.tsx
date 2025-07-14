const About = () => {
    return (
        <main className='bg-white px-6 py-12 text-gray-800 md:px-20'>
            {/* Hero */}
            <header className='mb-12 text-center'>
                <h1 className='mb-4 text-4xl font-extrabold text-blue-600 md:text-5xl'>
                    Welcome to Our Blog
                </h1>
                <p className='mx-auto max-w-2xl text-lg text-gray-600'>
                    A personal corner of the internet where we write about web
                    development, tech, and the stuff that inspires us.
                </p>
            </header>

            {/* Blog Intro */}
            <section className='mx-auto mb-10 max-w-3xl'>
                <h2 className='mb-2 text-2xl font-bold text-gray-800'>
                    What's This Blog About?
                </h2>
                <p className='leading-relaxed text-gray-700'>
                    This blog is a space where we share coding tutorials,
                    product insights, thoughts on modern development tools, and
                    the occasional deep dive into design or developer lifestyle.
                    Whether you're just getting started or an experienced dev,
                    we hope you'll find something useful here.
                </p>
            </section>

            {/* Our Story */}
            <section className='mx-auto mb-10 max-w-3xl'>
                <h2 className='mb-2 text-2xl font-bold text-gray-800'>
                    Who’s Behind It?
                </h2>
                <p className='leading-relaxed text-gray-700'>
                    Started by a group of developers who love writing and
                    teaching, this blog was born out of a desire to give back to
                    the community and document our journey through tech. We
                    believe in simplicity, clarity, and learning by sharing.
                </p>
            </section>

            {/* Topics We Cover */}
            <section className='mx-auto mb-10 max-w-3xl'>
                <h2 className='mb-2 text-2xl font-bold text-gray-800'>
                    What We Write About
                </h2>
                <ul className='list-inside list-disc space-y-1 text-gray-700'>
                    <li>React, TypeScript, and JavaScript tips</li>
                    <li>Next.js and full-stack development guides</li>
                    <li>UI/UX design principles for devs</li>
                    <li>Productivity tools & workflow hacks</li>
                    <li>Behind-the-scenes of side projects</li>
                </ul>
            </section>
        </main>
    );
};

export default About;
