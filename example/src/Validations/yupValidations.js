import * as Yup from 'yup'



Yup.addMethod(Yup.string, "valida_rut", function (errorMessage) {
    return this.test(`valida_ruttest`, errorMessage, function (value) {
        value = value && value.split('.').join('')
        value = value && value.split('-').join('')
      
        //Valor acumulado para el calculo de la formula
        var nAcumula = 0
        //Factor por el cual se debe multiplicar el valor de la posicion
        var nFactor = 2
        //Digito verificador
        var nDv = 0
        var nDvReal
        //extraemos el ultimo numero o letra que corresponde al verificador
        //La K corresponde a 10
        if (value && value.charAt(value.length - 1).toUpperCase() === 'K') nDvReal = 10
        //el 0 corresponde a 11
        else if (value && value.charAt(value.length - 1) === 0) nDvReal = 11
        else nDvReal = value && value.charAt(value.length - 1)
        for (var nPos = value && value.length - 2; nPos >= 0; nPos--) {
          nAcumula += value && value.charAt(nPos).valueOf() * nFactor
          nFactor++
          if (nFactor > 7) nFactor = 2
        }
      
        nDv = 11 - (nAcumula % 11)
        if (nDv === nDvReal) {
          return true
        } else {
          return false
        }
      })
  })
Yup.addMethod(Yup.string, "valida_email", function (errorMessage) {
    return this.test(`valida_email`, errorMessage, function (email) {
        if (email && email.length > 0) {
            //var regex = /^[a-zA-ZñÑ0-9\+\.\_\%\-\+]{1,256}\@[a-zA-ZñÑ0-9][a-zA-ZñÑ0-9\-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\-]{1,25})+$/;
            var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (regex.test(email)) {
                return true;
            } else {
                return false;
            }
        }
     
        return true;
  })
})
 
Yup.addMethod(Yup.string, "valida_patente", function (errorMessage) {
    return this.test(`valida_patente`, errorMessage, function (patente) {
        if (patente && patente.length > 0) {
            var regex = /^[a-z]{2}[\.\- ]?[0-9]{2}[\.\- ]?[0-9]{2}|[b-d,f-h,j-l,p,r-t,v-z]{2}[\-\. ]?[b-d,f-h,j-l,p,r-t,v-z]{2}[\.\- ]?[0-9]{2}$/i;
            if (regex.test(patente)) {
                return true;
            } else {
                return false;
            }
        }
     
        return true;
  })
})
Yup.addMethod(Yup.string, "valida_Texto", function (errorMessage) {
    return this.test(`valida_Texto`, errorMessage, function valida_Texto(valor) {
        var regex = /[^a-zA-ZñÑáàéèíìóòúùüÁÀÉÈÍÌÓÒÚÙÜ\.\-\s]/i; // para texto sin espacios usar: /^[a-zA-Z]*$/
        if (!regex.test(valor)) {
            return valor;
        } else {
            return valida_Texto(valor.substring(0, valor.length - 1));
        }
  })
})
 
const yupValidations = Yup.object({
    rut:Yup.string().required("El Rut es obligatorio"),//.valida_rut("nada"),
    nombre:Yup.string().required("El Nombre es obligatorio").valida_Texto("El nombre solo puede contener caracteres"),
    email:Yup.string().valida_email("Introduzca un Email válido").required("El Email es obligatorio"),
    patente:Yup.string().required("La Patente es obligatoria").valida_patente("La Patente no es válida"),
    mondea:Yup.string().required("Debe elegir una moneda"),
    total:Yup.string().required("El Total a pagar es obligatorio"),
    comuna:Yup.string().required("Debe elegir una Comuna"),
    //ciudad:Yup.string().required("El Rut es obligatorio")

})
export default yupValidations;