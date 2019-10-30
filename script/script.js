var choice_count = 0, is_before_bedis = true;
var all_progess = ['กำหนดหัวข้อ', 'หาทางเลือก', 'กำหนดขอบเขต', 'ตัดสินใจ'];
var all_effect = ['มากที่สุด', 'มาก', 'ปานกลาง', 'น้อย', 'น้อยที่สุด']
var benefit_data_count = [], disadvantage_data_count = [];

topic_form.onsubmit = function(events){ //When Form onsubmit
  events.preventDefault();

  if (!checktype()) {return;} //check form is not null

  //Hide Submit button after first click
  var hide_button = document.getElementById('topic_form'), topic_zone = document.getElementById('topic_zone');
  hide_button.innerHTML = '<input id="after_submit" type="text" name="topic" value="' + hide_button.topic.value + '" placeholder="หัวข้อในการตัดสินใจ">'

  topic_zone.style.cssText = 'top: calc(76px + 4.21vw);';
  setTimeout(function() {
    topic_zone.classList.remove('before_submit');
    add_choice_form();
    fadein(document.getElementById('makemind_step'));
    setTimeout(function() {progress(1);}, 500);
  }, 400);
}

//Loading Page
function loading(time){
  var loading = document.getElementById("loading");

  gototop();
  loading.style.display = "block";
  //fadein(loading); //Fade in loader
  setTimeout(function() {fadein(loading);}, 10);
  setTimeout(function() {fadeout(loading);}, time-500); //Fade out before show content 0.5s (transition times)

  setTimeout(function() {
    loading.style.display = "none";
    fadein(document.getElementById("contentid"));
  }, time);
}
//Go to top when click Center button
function gototop(){
  window.scrollTo({top: 0, behavior: 'smooth'});
}
//Fade in animation
function fadein(element){
  element.classList.add("show");
  element.classList.remove("hide");
}
function fadeout(element){
  element.classList.add("hide");
  element.classList.remove("show");
}

//progressbar
function progress(steps){
  for (i=0; i<4; i++){
    if (i < steps)
      document.getElementById('step' + (i+1)).classList.add('active');
    else
      document.getElementById('step' + (i+1)).classList.remove('active');
  }
}
//progressbar for result
function progress_result(steps){
  for (i=0; i<4; i++){
    if (i < steps)
      document.getElementById('res_step' + (i+1)).classList.add('active');
    else
      document.getElementById('res_step' + (i+1)).classList.remove('active');
  }
}

//ALL INPUT FORM
function choice_input_form(i, choiceName=""){
  all_form = '<div class="choice_form"><input type="text" name="choiceName'+ i +'" value="' + choiceName + '" class="choice_input" placeholder="ทางเลือก" autocomplete="off">';
  all_form += '<button type="submit" onclick="remove_choice_form(' + (i) + ')">ลบ</button><br></div>';

  return all_form;
}
function benefit_input_form(i, j, banefit_var="", isnewblock=false, effect=0){
  all_form = '<textarea name="benefitData'+ (i) + (j) +'" class="benefit_input' + (i) + '" placeholder="ข้อดี/ประโยชน์ที่ได้รับ">' + banefit_var + '</textarea>';
  all_form += '<button id="benefitremove" type="submit" onclick="remove_benefit_form(' + (i) + ', ' + (j) + ')"><i class="fa fa-times"></i></button>';

  all_form += '<select class="benefit_effect' + (i) + ' effect" id="effect" style="font-family: kanit_semibold; font-size: calc(6px + 1vw); color: #fff;">';
  if (effect == 0){
    all_form += '<option value="0" selected disabled>ผลกระทบในแง่บวก</option>';
  }else{
    all_form += '<option value="0" disabled>ผลกระทบในแง่บวก</option>';
  }

  for (i=0; i<5; i++) {
    if (effect != 5-i) {
      all_form += '<option value="' + (5-i) + '">' + all_effect[i] + '</option>';
    }else {
      all_form += '<option value="' + (5-i) + '" selected>' + all_effect[i] + '</option>';
    }
  }
  all_form += '</select>';

  if (isnewblock)
    all_form = '<div id="addbedis_form" class="addbedis_form">' + all_form + '</div>';
  return all_form;
}
function disadvantage_input_form(i, j, disadvantage_var="", isnewblock=false, effect=0){
  all_form = '<textarea name="disadvantage_Data'+ (i) + (j) +'" class="disadvantage_input' + (i) + '" placeholder="ข้อเสีย/ความเสี่ยงที่จะเกิด">' + disadvantage_var + '</textarea>';
  all_form += '<button id="disadvantageremove" type="submit" onclick="remove_disadvantage_form(' + (i) + ', ' + (j) + ')"><i class="fa fa-times"></i></button>';

  all_form += '<select class="disadvantage_effect' + (i) + ' effect" id="effect" style="font-family: kanit_semibold; font-size: calc(6px + 1vw); color: #fff;">';
  if (effect == 0){
    all_form += '<option value="0" selected disabled>ผลกระทบในแง่ลบ</option>';
  }else{
    all_form += '<option value="0" disabled>ผลกระทบในแง่ลบ</option>';
  }

  for (i=0; i<5; i++){
    if (effect != 5-i) {
      all_form += '<option value="' + (5-i) + '">' + all_effect[i] + '</option>';
    }else {
      all_form += '<option value="' + (5-i) + '" selected>' + all_effect[i] + '</option>';
    }
  }
  all_form += '</select>';

  if (isnewblock)
    all_form = '<div id="addbedis_form" class="addbedis_form">' + all_form + '</div>'
  return all_form;
}
function add_benefit_button(i){
  return '<button type="submit" onclick="add_benefit_form(' + (i) + ')">เพิ่มประโยชน์/ข้อดี</button><br>';
}
function add_disadvantage_button(i){
  return '<button type="submit" onclick="add_disadvantage_form(' + (i) + ')">เพิ่มความเสี่ยง/ข้อเสีย</button><br>';
}
function add_choice_button(){
  addform = '<button id="add_choice" onclick="add_choice_form()" name="addchoice">เพิ่มทางเลือก</button>';
  addform += '<button id="center_choice" onclick="gototop()"><i class="fa fa-angle-double-up"></i></button>';
  if (is_before_bedis){
    addform += '<button id="make_choice" onclick="define_scope()" name="submit">กำหนดขอบเขต</button>';
  }else{
    addform += '<button id="make_choice" onclick="makeupchoice()" name="submit">ตัดสินใจ</button>';
  }
  return addform;
}
function retry_button(){
  addform = '<div class="form retry" id="choice_form"><button id="add_choice" onclick="reform()" name="addchoice">แก้ไขแบบฟอร์ม</button>';
  addform += '<button id="center_choice" onclick="gototop()"><i class="fa fa-angle-double-up"></i></button>';
  addform += '<a href="./index.html"><button id="make_choice" name="submit">ตัดสินใจเรื่องใหม่</button></a></div>';

  return addform;
}

//Add set of benefit/disadvantage
function benefit(pos, movetoleft=false){
  all_form = '<div class="benefit_form"><h3>ข้อดี/ผลประโยชน์</h3>';
  var benefit_data = document.getElementsByClassName('benefit_input' + pos);
  var effect_benefit = document.getElementsByClassName('benefit_effect' + pos);
  for (j=0; j<benefit_data_count[pos]; j++)
    all_form += benefit_input_form(pos-movetoleft, j, benefit_data[j].value, false, effect_benefit[j].value);
  return all_form;
}
function disadvantage(pos, movetoleft=false){
  all_form = '<div class="disadvantage_form"><h3>ข้อเสีย/ความเสี่ยง</h3>';
  var disadvantage_data = document.getElementsByClassName('disadvantage_input' + pos);
  var effect_disadvantage = document.getElementsByClassName('disadvantage_effect' + pos);
  for (j=0; j<disadvantage_data_count[pos]; j++)
      all_form += disadvantage_input_form(pos-movetoleft, j, disadvantage_data[j].value, false, effect_disadvantage[j].value);
  return all_form;
}

//Check for null form
function checktype(){
  var check_bool = true, effect_check = true;
  if (document.getElementById('topic_form').topic.value == "") //check topic
    check_bool = false

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count&&check_bool; i++){
    if (choice_data[i].value == "")
      check_bool = false;

    var benefit_data = document.getElementsByClassName('benefit_input' + i); //Benefit form
    var effect_benefit = document.getElementsByClassName('benefit_effect' + i); //Benefit Weight Effect
    for (j=0; j<benefit_data_count[i]&&check_bool; j++){
      if (benefit_data[j].value == ""){
        check_bool = false;
      }if (effect_benefit[j].value == 0){
        effect_check = false;
      }
    }

    var disadvantage_data = document.getElementsByClassName('disadvantage_input' + i); //disadvantage Form
    var effect_disadvantage = document.getElementsByClassName('disadvantage_effect' + i); //Disadvantage Weight Effect
    for (j=0; j<disadvantage_data_count[i]&&check_bool; j++){
      if (disadvantage_data[j].value == ""){
        check_bool = false;
      }if (effect_disadvantage[j].value == 0){
        effect_check = false;
      }
    }
  }
  if (!check_bool){
    swal({title: "คำเตือน", text: "กรุณากรอกข้อมูลให้ครบถ้วน", type: "warning",});
  }else if (!effect_check){
    swal({title: "คำเตือน", text: "กรุณาเลือกระดับผลกระทบให้ครบถ้วน", type: "warning",});
  }
  return (check_bool&&effect_check);
}
function checkbedis(){
  for (i=0; i<choice_count; i++){
    if (benefit_data_count[i] == 0 && disadvantage_data_count[i] == 0){
      swal({title: "คำเตือน", text: "กรุณาใส่ข้อมูลในทางเลือกอย่างน้อย 1 ข้อ", type: "warning",});
      return false;
    }
  }
  return true;
}

//Before Denefit/Disadventage
function define_scope(){
  if (!checktype()) {return;} //check form is not null

  is_before_bedis = false;

  var showform = document.getElementById('choice_form'), all_form = "";
  fadeout(showform);

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){
      all_form += choice_input_form(i, choice_data[i].value) + '<div class="bedis_form">';

      //Benefit Disadventage form
      all_form += benefit(i) + add_benefit_button(i) + '</div>';
      all_form += disadvantage(i) + add_disadvantage_button(i) + '</div></div>';
  }
  all_form += add_choice_button();

  setTimeout(function() {showform.innerHTML = all_form; fadein(showform); progress(2);}, 500);
}

function add_benefit_form(choiceindex){ //add benefit form
  var showform = document.getElementById('choice_form'), all_form = "";

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){ //Keep old Data
    all_form += choice_input_form(i, choice_data[i].value) + '<div class="bedis_form">';

    all_form += benefit(i); //Benefit form
    if (i == choiceindex)
      all_form += benefit_input_form(i, j, '', isnewblock=true); //For new block animation
    all_form += add_benefit_button(i) + '</div>';

    all_form += disadvantage(i) + add_disadvantage_button(i) + '</div></div>'; //disadvantage Form
  }
  all_form += add_choice_button();
  benefit_data_count[choiceindex] += 1; //add benefit pos i count

  showform.innerHTML = all_form; //Show in choice_form
  setTimeout(function() {document.getElementById("addbedis_form").classList.remove('addbedis_form');}, 1); //Remove Class for fade in animation
}

function add_disadvantage_form(choiceindex){ //add disadvantage form
  var showform = document.getElementById('choice_form'), all_form = "";

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){ //Keep old Data
    all_form += choice_input_form(i, choice_data[i].value) + '<div class="bedis_form">';

    all_form += benefit(i) + add_benefit_button(i) + '</div>'; //Benefit form

    all_form += disadvantage(i); //disadvantage Form
    if (i == choiceindex)
      all_form += disadvantage_input_form(i, j, '', isnewblock=true); //For new block animation
    all_form += add_disadvantage_button(i) + '</div></div>';
  }
  all_form += add_choice_button();
  disadvantage_data_count[choiceindex] += 1;

  showform.innerHTML = all_form; //Show in choice_form
  setTimeout(function() {document.getElementById("addbedis_form").classList.remove('addbedis_form');}, 1); //Remove Class for fade in animation
}

function remove_benefit_form(remove_i, remove_j){
  var showform = document.getElementById('choice_form'), all_form = "";

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){ //Keep old Data
    all_form += choice_input_form(i, choice_data[i].value) + '<div class="bedis_form">';

    //Benefit form
    all_form += '<div class="benefit_form"><h3>ข้อดี/ผลประโยชน์</h3>';
    var benefit_data = document.getElementsByClassName('benefit_input' + i), movetoleft = false;
    var effect_benefit = document.getElementsByClassName('benefit_effect' + i);
    for (j=0; j<benefit_data_count[i]; j++){
      if (i != remove_i || j != remove_j){ //If not the delete point
        all_form += benefit_input_form(i, j-movetoleft, benefit_data[j].value, false, effect_benefit[j].value);
      }else {
        movetoleft = true; //Move form replace remove point
      }
    }
    all_form += add_benefit_button(i) + '</div>';

    all_form += disadvantage(i) + add_disadvantage_button(i) + '</div></div>'; //disadvantage Form
  }
  all_form += add_choice_button();

  benefit_data_count[remove_i] -= 1;
  showform.innerHTML = all_form; //Show in choice_form
}

function remove_disadvantage_form(remove_i, remove_j){
  var showform = document.getElementById('choice_form'), all_form = "";

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){ //Keep old Data
    all_form += choice_input_form(i, choice_data[i].value)  + '<div class="bedis_form">';

    all_form += benefit(i) + add_benefit_button(i) + '</div>'; //Benefit form

    //disadvantage Form
    all_form += '<div class="disadvantage_form"><h3>ข้อเสีย/ความเสี่ยง</h3>';
    var disadvantage_data = document.getElementsByClassName('disadvantage_input' + i), movetoleft = false; //movetoleft not use until pass delete point
    var effect_disadvantage = document.getElementsByClassName('disadvantage_effect' + i);
    for (j=0; j<disadvantage_data_count[i]; j++){
      if (i != remove_i || j != remove_j){
        all_form += disadvantage_input_form(i, j-movetoleft, disadvantage_data[j].value, false, effect_disadvantage[j].value);
      }else {
        movetoleft = true; //Move form replace remove point
      }
    }
    all_form += add_disadvantage_button(i) + '</div></div>';
  }
  all_form += add_choice_button();

  disadvantage_data_count[remove_i] -= 1;
  showform.innerHTML = all_form; //Show in choice_form
}

function add_choice_form(){ //Add Choice input +1 form
  choice_count += 1; //Start from 1

  var showform = document.getElementById('choice_form'), all_form = "";

  if (choice_count != 1){ //If haven't any choice form
    var choice_data = document.getElementsByClassName('choice_input');
    for (i=0; i<choice_count-1; i++){ //Keep old Data
      all_form += choice_input_form(i, choice_data[i].value)  + '<div class="bedis_form">'; //Choice name and benefit box

      //Benefit Disadventage form
      all_form += benefit(i) + add_benefit_button(i) + '</div>';
      all_form += disadvantage(i) + add_disadvantage_button(i) + '</div></div>';
    }
  }
  benefit_data_count[choice_count - 1] = disadvantage_data_count[choice_count - 1] = 0;
  all_form += '<div class="addchoice_form" id="addchoice_form">' + choice_input_form(choice_count-1); //New choice input
  all_form += '<div class="bedis_form"><div class="benefit_form"><h3>ข้อดี/ผลประโยชน์</h3>' + add_benefit_button(choice_count-1) + '</div>';
  all_form += '<div class="disadvantage_form"><h3>ข้อเสีย/ความเสี่ยง</h3>' + add_disadvantage_button(choice_count-1) + '</div></div>';

  showform.innerHTML = all_form + add_choice_button() + '</div>'; //Show in choice_form
  if (is_before_bedis){ //Hide Button Before type benefit/disadvantage
    var bedis_form = document.getElementsByClassName('bedis_form');
    for (i=0; i<choice_count; i++)
      bedis_form[i].style.display = "none";
  }
  setTimeout(function() {document.getElementById("addchoice_form").classList.remove('addchoice_form'); }, 100); //Remove Class for fade in animation
}

function remove_choice_form(choiceindex){
  if (choice_count == 1){ //Show Warning Button When choice_count is 1
    swal({
      title: "คำเตือน",
      text: "คุณไม่สามารถลบทางเลือกทั้งหมดได้",
      type: "warning",
    });
    return;
  }swal({ //Show comfirm button
    title: "แน่ใจหรือปล่าว?",
    text: "ต้องการจะลบทางเลือกของคุณ ใช่หรือไม่",
    type: "warning",
    showCancelButton: true,
    confirmButtonClass: "btn-danger",
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Comfirm",
    closeOnConfirm: true
  }, function(){
    var showform = document.getElementById('choice_form');
    var all_form = "";

    var choice_data = document.getElementsByClassName('choice_input'), movetoleft = false;
    for (i=0; i<choice_count; i++){ //Keep old Data
      if (i == choiceindex) {movetoleft = true; continue; } //If pass remove point move down data to 1 top box

      all_form += choice_input_form(i-movetoleft, choice_data[i].value) + '<div class="bedis_form">';

      all_form += benefit(i, movetoleft) + add_benefit_button(i-movetoleft) + '</div>';
      all_form += disadvantage(i, movetoleft) + add_disadvantage_button(i-movetoleft) + '</div></div>';

      benefit_data_count[i-movetoleft] = benefit_data_count[i];
      disadvantage_data_count[i-movetoleft] = disadvantage_data_count[i];
    }
    choice_count -= 1;
    all_form += add_choice_button();

    showform.innerHTML = all_form; //Show in choice_form
    if (is_before_bedis){
      var bedis_form = document.getElementsByClassName('bedis_form');
      for (i=0; i<choice_count; i++)
        bedis_form[i].style.display = "none"; //Hide Button Before type benefit/disadvantage
    }
  });
}

function makeupchoice(){
  if (!checktype()) {return;} //check form is not null
  if (!checkbedis()) {return;} //Check for 0 count of benefit/disadvantage

  result_output = '<div class="topic_zone"><h1>Make<span style="color: #F16645;">Your</span>Mind</h1>'; //Topic Zone
  result_output += '<h3>แอปช่วยตัดสินใจ ด้วยวิธีการที่ถูกต้อง</h3>';
  result_output += '<form class="topic_form show_result"><input type="text" value="' + document.getElementById('topic_form').topic.value + '" placeholder="หัวข้อในการตัดสินใจ" disabled></form></div>';

  result_output += '<div class="container" id="makemind_step"><ul class="progressbar">'; //Progess steps
  for (i=1; i<=4; i++) {result_output += '<li id="res_step' + i + '">' + all_progess[i-1] + '</li>';}
  result_output += '</ul></div>';

  var showoutput = document.getElementById('result');
  var bedis_ratio = [], benefit_length = [], weight_benefit = [], disadvantage_length = [], weight_disadvantage = []; // length is a length of text

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){ //Calculate ratio to find the best choice
    //Benefit form
    benefit_length[i] = 1;
    weight_benefit[i] = 0;
    var benefit_data = document.getElementsByClassName('benefit_input' + i);
    var effect_benefit = document.getElementsByClassName('benefit_effect' + i);
    for (j=0; j<benefit_data_count[i]; j++){
      benefit_length[i] += benefit_data[j].value.length;
      weight_benefit[i] += effect_benefit[j].value;
    }
    weight_benefit[i] = weight_benefit[i]*benefit_data_count[i] + 1;

    //disadvantage form
    disadvantage_length[i] = 1;
    weight_disadvantage[i] = 0;
    var disadvantage_data = document.getElementsByClassName('disadvantage_input' + i);
    var effect_disadvantage = document.getElementsByClassName('disadvantage_effect' + i);
    for (j=0; j<disadvantage_data_count[i]; j++){
      disadvantage_length[i] += disadvantage_data[j].value.length;
      weight_disadvantage[i] += effect_disadvantage[j].value;
    }
    weight_disadvantage[i] = weight_disadvantage[i]*disadvantage_data_count[i] + 1;

    bedis_ratio[i] = (benefit_length[i]/disadvantage_length[i])/100 + (weight_benefit[i]/weight_disadvantage[i]); //Calculate Ratio
  }

  //Find max of benefit choice
  var max_count = 0, ratio_max = bedis_ratio[0], pos = [0]; //max_count -> number of max number and assign as index in pos
  for (i=1; i<choice_count; i++){
    if (ratio_max < bedis_ratio[i]){
      ratio_max = bedis_ratio[i];
      max_count = 0;
      pos[max_count] = i;
    }else if (ratio_max == bedis_ratio[i]) {
      if (benefit_data_count[i] > benefit_data_count[pos] || disadvantage_data_count[i] < disadvantage_data_count[pos]){ //if ratio equal try to check number of benefit/disadvantage list
        ratio_max = bedis_ratio[i];
        max_count = 0;
        pos[max_count] = i;
      }else{
        max_count += 1;
        pos[max_count] = i;
      }
    }
  }

  if (max_count != 0){
    result_output += '<h2>ฉันลังเลระหว่าง <span class="best_result">';
    for (i=0; i<max_count; i++) //If max have 2 value upper
      result_output += choice_data[pos[i]].value + ', ';
    result_output += choice_data[pos[i]].value + '</span></h2>'
  }else{
    if (ratio_max > 60){
      result_output += '<h2>ไม่ต้องลังเลลอง <span class="best_result">"' + choice_data[pos[0]].value + '"</span> ไปเลย!!!</h2>';
    }else if (ratio_max > 40){
      result_output += '<h2>มันคุ้มค่าที่จะลอง <span class="best_result">"' + choice_data[pos[0]].value + '"</span> อยู่นะ</h2>';
    }else if (ratio_max > 20) {
      result_output += '<h2>ถ้าสนใจก็ลอง <span class="best_result">"' + choice_data[pos[0]].value + '"</span> ดูสิ</h2>';
    }else if (ratio_max > 0.1) {
      result_output += '<h2>อยากจะลองเสี่ยง <span class="best_result">"' + choice_data[pos[0]].value + '"</span> ดูมั้ย?</h2>';
    }else{
      result_output += '<h2>ไม่ควรที่จะลองอะไรแต่เสี่ยง <span class="best_result">"' + choice_data[pos[0]].value + '"</span> ดูก็ได้</h2>';
    }
  }
  result_output += '<h4>ทางเลือกการตัดสินใจสุดท้ายเป็นของคุณเลือกในทางตามใจตัวเองดีกว่า</h4>';

  //MakeYourMind Animation
  content = document.getElementById("contentid");
  fadeout(content);
  setTimeout(function() { //loading and remove content with display
    content.style.display = "none";
    loading(2500);
    showoutput.style.display = "block";
  }, 500);

  fadeout(showoutput); //Hide Result for show animation
  setTimeout(function() {
    showoutput.innerHTML = result_output + show_table(bedis_ratio);
    progress_result(3);
    fadein(showoutput); //Show Result
    setTimeout(function() {progress_result(4);}, 400);
  }, 2800);

  //2 ปุ่มสุดท้ายคือปุ่มแก้ กับรีเฟรชหน้าใหม่ (มี center เหมือนเดิม)
  // อย่าลืมบวกปุ่มให้ดูตารางด้วย!!!
}

//call form again
function reform(){
  showoutput = document.getElementById('result'); //Table Result
  content = document.getElementById("contentid");

  progress(1); //Re Animation step 3s
  fadeout(showoutput); //Show Result
  setTimeout(function() { //loading and remove content with display
    showoutput.style.display = "none"; //Remove block after fadeout
    loading(2500);
    content.style.display = "block";
  }, 500);

  //Fade In
  fadeout(content);
  setTimeout(function() { //loading and remove content with display
    fadein(content);
    setTimeout(function() {progress(2);}, 400);
  }, 2800);
}

function show_table(bedis_ratio){ //Result Table
  var result_output = '<table>';

  var choice_data = document.getElementsByClassName('choice_input');
  for (i=0; i<choice_count; i++){
    result_output += '<tr><th class="benefit_topic_col">ทำไม ' + choice_data[i].value + ' ถึงดี?</th><th class="disadvantage_topic_col">ทำไม ' + choice_data[i].value + ' ถึงไม่ดี?</th></tr>'; //Benefit and Disadventage Topic Row

    //Benefit form
    if (benefit_data_count[i] != 0){
      result_output += '<tr><td class="benefit_col">';
      var benefit_data = document.getElementsByClassName('benefit_input' + i);
      for (j=0; j<benefit_data_count[i]-1; j++)
        result_output += '<span style="margin-bottom: 12px;">' + benefit_data[j].value + '</span>';
      result_output += '<span>' + benefit_data[benefit_data_count[i]-1].value + '</span></td>'; //Have no margin bottom for vertical center
    }else{
      result_output += '<tr><td class="benefit_col no_data">ไม่มี</td>'; //If have no data
    }

    //disadvantage form
    if (disadvantage_data_count[i] != 0){
      result_output += '<td class="disadvantage_col">';
      var disadvantage_data = document.getElementsByClassName('disadvantage_input' + i);
      for (j=0; j<disadvantage_data_count[i]-1; j++)
        result_output += '<span style="margin-bottom: 12px;">' + disadvantage_data[j].value + '</span>';
      result_output += '<span>' + disadvantage_data[disadvantage_data_count[i]-1].value + '</span></td></tr>'; //Have no margin bottom for vertical center
    }else{
      result_output += '<td class="disadvantage_col no_data">ไม่มี</td></tr>'; //If have no data
    }
  }
  return result_output + '</table>' + retry_button();
}
