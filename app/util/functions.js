import axios from "axios";
const host = 'https://api.iecompanion.com';
import supabase from "@/supabase";
import OpenAI from "openai";
import Groq from "groq-sdk";


const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
});

//Setup groq moderation instead of openai

  async function moderate(input) {
    const moderation = await openai.moderations.create({ input: input });
    return moderation;
  }


function discordEmbed(title, fields = []) {
    const embedFields = fields.map(field => {
        return { name: field.name, value: field.value, inline: field.inline }
    });
    return {
        title: title,
        color: 7413420, // You can use any RGB color value
        fields: embedFields
    };
}

export const postReview = async (professorId, courseId, rating, comment) => {
    let response;

    // First, perform moderation on the comment
    try {
        const moderationResult = await moderate(comment);
        if (moderationResult.results[0].flagged) {
            const reasons = Object.entries(moderationResult.results[0].categories)
                .filter(([_, flagged]) => flagged)
                .map(([category, _]) => category)
                .join(', ');
            console.error('Comment not allowed due to:', reasons);
            throw new Error(`Comment not allowed due to: ${reasons}`);
        }
    } catch (error) {
        console.error('Error during moderation:', error);
        throw error;
    }

    // If moderation passes, proceed with posting the review
    try {
        const { data, error } = await supabase
            .from('reviews')
            .insert([
                { professor_id: professorId, course_id: courseId, rating, comment }
            ]);
        if (error) throw error;
        response = data; // Handle response here
    } catch (error) {
        console.error('Error posting review:', error);
        throw error;
    }

    try {
        const { data: professor, error: professorError } = await supabase
            .from('professors')
            .select()
            .eq('id', professorId).single()

        const { data: course, error: courseError } = await supabase
            .from('courses')
            .select()
            .eq('id', courseId).single()

        const embedFields = [
            { name: 'Professor', value: professor.name, inline: true },
            { name: 'Course', value: course.name, inline: true },
            { name: 'Rating', value: rating.toString(), inline: true },
            { name: 'Comment', value: comment, inline: false }
        ];

        await axios.post('https://discord.com/api/webhooks/1221447921141289022/Yk3uTCht-V5pLJUOgbXtOWJIuV7-v3TlLqLReU6Z3Uu72HJCY_BN6uIR4s62raLslQi0', {
            embeds: [discordEmbed('New Review Submitted', embedFields)]
        });
        console.log('Review posted to Discord successfully.');
    } catch (error) {
        console.error('Error posting review to Discord:', error);
    }

    return response;
};

export const postProfessorRequest = async (name, email, courses_taught, degree_year, additional_info) => {
    try {
        const response = await axios.post(`${host}/professor-requests`, {
            name,
            email,
            courses_taught,
            degree_year,
            additional_info
        });

        const embedFields = [
            { name: 'Name', value: name, inline: true },
            { name: 'Email', value: email, inline: true },
            { name: 'Courses Taught', value: courses_taught, inline: true },
            { name: 'Degree Year', value: degree_year.toString(), inline: true },
            { name: 'Additional Info', value: additional_info }
        ];

        const discordEmbed = discordEmbed('New Professor Request', embedFields);

        await axios.post('https://discord.com/api/webhooks/1221448045678559322/R8ke2Ig8w6AJ1gGQ9286dIyjHxi7A-nVH-XcYxwdB_ufYWi_l0a_cNIO_Dmp4Tu-X7dg', {
            embeds: [discordEmbed]
        });
        
        return response.data;
    } catch (error) {
        console.error('Error posting professor request:', error);
        throw error;
    }
};

export const postCourseRequest = async (name, course_professor, degree_year, additional_info) => {
    try {
        const response = await axios.post(`${host}/course-requests`, {
            name,
            course_professor,
            degree_year,
            additional_info
        });

        const embedFields = [
            { name: 'Name', value: name, inline: true },
            { name: 'Course Professor', value: course_professor, inline: true },
            { name: 'Degree Year', value: degree_year.toString(), inline: true },
            { name: 'Additional Info', value: additional_info }
        ];

        const discordEmbed = discordEmbed('New Course Request', embedFields);

        await axios.post('https://discord.com/api/webhooks/1221448179929841665/h3qAwXq4mL1yZb9WCMAvGRFP6SR3epVtYDSZzg3BSn9wtiIKVEwaBLUE4w635JaqvTmA', {
            embeds: [discordEmbed]
        });
        
        return response.data;
    } catch (error) {
        console.error('Error posting course request:', error);
        throw error;
    }
};

export const postAddInfoProfessor = async (professor_id, info) => {
    try {
        const response = await axios.post(`${host}/add_professor_info`, {
            professor_id,
            info,
        });

        const professorResponse = await axios.get(`${host}/professors/${professor_id}`);
        const professorName = professorResponse.data.name;

        const embedFields = [
            { name: 'Professor', value: professorName, inline: true },
            { name: 'Additional Info', value: info }
        ];

        const discordEmbed = discordEmbed('New Professor Info Added', embedFields);

        await axios.post('https://discord.com/api/webhooks/1221448360700149771/BYqNWh_7xc4RwuwMkoKfGdnyng5OyMGbr1DKRUtAcl_WM2l8Ye6LsLXV7MmMJI0t0f_n', {
            embeds: [discordEmbed]
        });

        return response.data;
    } catch (error) {
        console.error('Error posting additional info for professor:', error);
        throw error;
    }
};

export const postAddInfoCourse = async (course_id, info) => {
    try {
        const response = await axios.post(`${host}/add_course_info`, {
            course_id,
            info,
        });

        const courseResponse = await axios.get(`${host}/courses/${course_id}`);
        const courseName = courseResponse.data.name;

        const embedFields = [
            { name: 'Course', value: courseName, inline: true },
            { name: 'Additional Info', value: info }
        ];

        const discordEmbed = discordEmbed('New Course Info Added', embedFields);

        await axios.post('https://discord.com/api/webhooks/1221448523976020019/7q8uWQvOjcMeR_HHedUiMwzK9dinAw6tIQmfcIuACpnysZIQU1vdAmjq4Qm0PiBn3zQx', {
            embeds: [discordEmbed]
        });
        return response.data;
    } catch (error) {
        console.error('Error posting additional info for course:', error);
        throw error;
    }
};
