import bcrypt from 'bcryptjs';

const testPassword = async () => {
  const plainPassword = '123456'; // Password used for testing
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  console.log('Generated hash:', hashedPassword);

  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log('Password match result:', isMatch); // Should be true
};

testPassword();
