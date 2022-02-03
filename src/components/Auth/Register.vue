<template>
    <section class="container d-flex flex-column">
        <h1 class="text-center text-primary m-3"> Registration Form </h1>
        <form class="form p-2 mb-2 align-self-center w-50" @submit="submit">
            <fieldset>
                <div class="d-flex flex-column mt-3">
                    <div v-if="error"><p class="text-danger">{{error}}</p></div>
                    <div class="p-1">
                        <BaseInput 
                            label="UserName"
                            type="text"
                            :error="errors.UserName"
                            :modelValue="UserName"
                            @change="handleChangeUserName"
                        />
                    </div>
                    <div class="p-1">
                        <BaseInput 
                            label="Email"
                            type="email"
                            :error="errors.Email"
                            :modelValue="Email"
                            @change="handleChangeEmail"
                        />
                    </div>
                    <div class="p-1">
                        <BaseInput 
                            label="Password"
                            type="password"
                            :error="errors.Password"
                            :modelValue="Password"
                            @change="handleChangePassword"
                        />
                    </div>
                    <div class="text-center mt-2">
                        <BaseButton type="submit" BtnClass="btn-primary mt-3">Submit</BaseButton>
                    </div>
                </div>
            </fieldset>
        </form>
    </section>
</template>

<script>
import {useField, useForm} from 'vee-validate'
import {string, object} from 'yup';
import UserService from '../../services/auth/UserService';

export default {
    data(){
        const validationSchema = object({
            UserName: string().required(),
            Email: string().email().required(),
            Password: string().required()
        });

        const {handleSubmit, setFieldValue, errors} = useForm({
            validationSchema,
            initialValues:{
            }
        })

        const handleChangeUserName = (event) => {
            setFieldValue('UserName',event.target.value)
        }

        const handleChangeEmail = (event) => {
            setFieldValue('Email',event.target.value)
        }

        const handleChangePassword = (event) => {
            setFieldValue('Password',event.target.value)
        }

        const {value: UserName } = useField('UserName')
        const {value: Email } = useField('Email')
        const {value: Password } = useField('Password')

        const submit = handleSubmit(values => {
            this.error = '';
            this.RegisterUser(values);
        })

        return{
            UserName,
            Email,
            Password,
            submit,
            errors,
            handleChangeUserName,
            handleChangeEmail,
            handleChangePassword,
            error:''
        }
    },
    methods:{
        async RegisterUser(data){
            data.Role = 2;
            let res = await UserService.createUsers(data);
            console.log(res.data.message);
            if(res.status == 200){
                alert("Registered Successfully!");
                this.$router.replace({name:'login'});
            }else{
                this.error = res.data.message;
                console.log(this.error)
                alert("Error");
            }
        }
    }
}
</script>

<style scoped>

</style>